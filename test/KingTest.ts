import { expect } from 'chai';
import { ethers } from 'hardhat';
import { IUniRouter02_abi } from './abi_files/IUniRouter02_abi.js';
import { token_abi } from './abi_files/token_abi.js';
import { Contract } from "ethers";

const ROUTER = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";
const USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";

describe(`Testing King contract`, () => {
    let users: any;
    let user1: any, user2: any, user3: any, user4: any, _: any;
    let usdc: any;
    let router: any;
    let WNATIVE: any;
    let King: Contract;
    let receiptToken: any;
    before(async () => {
        [user1, user2, user3, user4, _] = await ethers.getSigners();
        const King_instance = await ethers.getContractFactory("King");
        King = await King_instance.deploy();

        // fund users 1 through 4 with MATIC
        users = [user1, user2, user3, user4]
        for (let x of users) {
            await ethers.provider.send("hardhat_setBalance", [
                x.address,
                "0x21E19E0C9BAB240000000", //amount of 2560000*10^18 in hex
            ]);
        }

        //create a router to swap into USDC
        router = await ethers.getContractAt(IUniRouter02_abi, ROUTER);
        WNATIVE = await router.WETH();
        // await router.swapExactETHForTokens(0, [WNATIVE, USDC], user1.address, Date.now() + 900, { value: ethers.utils.parseEther("1000") }) //USDC 6 decimals
        await router.connect(user3).swapExactETHForTokens(0, [WNATIVE, USDC], user3.address, Date.now() + 900, { value: ethers.utils.parseEther("1000") }) //USDC 6 decimals
        usdc = await ethers.getContractAt(token_abi, USDC);
        // receiptToken = await ethers.getContractAt(token_abi, King.address);
    });

    describe(`Testing depositing into King, withdrawing from King:
    `, () => {
        it('Should allow an initial deposit of 1 MATIC from user 1 into King, increasing the contract balance by 1 MATIC', async () => {
            let tx = {
                to: King.address,
                // Convert currency unit from ether to wei
                value: ethers.utils.parseEther("100"),
            }
            // Send a transaction
            await user1.sendTransaction(tx);

            expect(await ethers.provider.getBalance(King.address)).to.be.gt(0);
        })
        it('Should have user1 as king after first deposit', async () => {
            expect(await King.getKing()).to.equal(user1.address);
        })
        it('Should not allow a second deposit of less than 1.5 MATIC', async () => {
            let tx = {
                to: King.address,
                // Convert currency unit from ether to wei
                value: ethers.utils.parseEther("1")
            }
            // Send a transaction
            try {
                await user2.sendTransaction(tx);
            } catch (err) { }

            expect(await King.getKing()).to.equal(user1.address);
        })
        it('Should allow a second deposit of > 1.5 MATIC, sending the deposited amt to user1', async () => {
            let initialUser1Balance = await user1.getBalance();
            let tx = {
                to: King.address,
                // Convert currency unit from ether to wei
                value: ethers.utils.parseEther("200"),
            }
            // Send a transaction
            await user2.sendTransaction(tx);
            let finalUser1Balance = await user1.getBalance();
            expect(finalUser1Balance).to.be.gt(initialUser1Balance);
        })
        it('Should have user 2 as King after second deposit', async () => {
            expect(await King.getKing()).to.equal(user2.address);
        })
        it('Should take a USDC deposit', async () => {
            //approve the transaction
            let usdcAmount = 1000000000;
            await usdc.connect(user3).approve(King.address, 0);
            await usdc.connect(user3).approve(King.address, usdcAmount);

            await King.connect(user3).deposit(usdcAmount);

            expect(await King.getKing()).to.equal(user3.address);
        })
        it('Should do an emergency withdraw', async () => {
            await King.emergencyWithdraw();

            expect(await user1.getBalance()).to.be.gt(0);
        })
    })
})

