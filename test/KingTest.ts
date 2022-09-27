import { expect } from 'chai';
import { ethers } from 'hardhat';
// import { IUniRouter02_abi } from './abi_files/IUniRouter02_abi.js';
// import { token_abi } from './abi_files/token_abi.js';
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
        // router = await ethers.getContractAt(IUniRouter02_abi, ROUTER);
        // WNATIVE = await router.WETH();
        // await router.swapExactETHForTokens(0, [WNATIVE, USDC], user1.address, Date.now() + 900, { value: ethers.utils.parseEther("1000") }) //USDC 6 decimals
        // await router.connect(user2).swapExactETHForTokens(0, [WNATIVE, USDC], user2.address, Date.now() + 900, { value: ethers.utils.parseEther("1000") }) //USDC 6 decimals
        // usdc = await ethers.getContractAt(token_abi, USDC);
        // receiptToken = await ethers.getContractAt(token_abi, King.address);
    });

    describe(`Testing depositing into King, withdrawing from King:
    `, () => {
        it('Should allow an initial deposit of 1 MATIC from user 1 into King, increasing the contract balance by 1 MATIC', async () => {
            let tx = {
                to: King.address,
                // Convert currency unit from ether to wei
                value: ethers.utils.parseEther("1")
            }
            // Send a transaction
            await user1.sendTransaction(tx);

            expect(await ethers.provider.getBalance(King.address)).to.be.gt(0);
        })
        it('Should have user1 as king after first deposit', async () => {
            expect(await King._king()).to.equal(user1.address);
        })
        // it('Should not allow a second deposit of less than 1.5 MATIC', async () => {
        //     let tx = {
        //         to: King.address,
        //         // Convert currency unit from ether to wei
        //         value: ethers.utils.parseEther("1")
        //     }
        //     // Send a transaction
        //     await user2.sendTransaction(tx);

        //     expect(await King._king()).to.equal(user1.address);
        // })
        it('Should allow a second deposit of > 1.5 MATIC, sending the deposited amt to user1', async () => {
            let initialUser1Balance = await user1.getBalance();
            let tx = {
                to: King.address,
                // Convert currency unit from ether to wei
                value: ethers.utils.parseEther("2")
            }
            // Send a transaction
            await user2.sendTransaction(tx);
            let finalUser1Balance = await user1.getBalance();

            expect(finalUser1Balance).to.be.gt(initialUser1Balance);
        })
        it('Should have user 2 as King after second deposit', async () => {
            expect(await King._king()).to.equal(user2.address);
        })
        // it('Should give portfolio a non-zero weth balance', async () => {
        //     var weth = await ethers.getContractAt(token_abi, WETH_ADDRESS);
        //     var wethBalance = await weth.balanceOf(King.address);

        //     expect(wethBalance).to.be.gt(0);
        // })
        // it('Should give portfolio a non-zero wbtc balance', async () => {
        //     var wbtc = await ethers.getContractAt(token_abi, WBTC_ADDRESS);
        //     var wbtcBalance = await wbtc.balanceOf(King.address);

        //     expect(wbtcBalance).to.be.gt(0);
        // })
        // it('Should deposit USDC from user 2 into King - leading to an increase in receipt tokens for user 2', async () => {
        //     var usdcBalance = 10000000; //await usdc.balanceOf(user2.address);
        //     await usdc.connect(user2).approve(King.address, usdcBalance);

        //     const receiptTokenBalanceBeforeDeposit = await receiptToken.balanceOf(user2.address);

        //     await King.connect(user2).depositUserFunds(usdcBalance); //todo - change min in amount from 0
        //     var supply = await King.totalSupply();
        //     const receiptTokenBalanceAfterDeposit = await receiptToken.balanceOf(user2.address);
        //     expect(receiptTokenBalanceAfterDeposit).to.be.gt(receiptTokenBalanceBeforeDeposit);
        // })
        // it('Should allocate user 2 almost exactly the same number of shares as user 1', async () => {
        //     const receiptTokenBalanceUser1AfterDeposit = await receiptToken.balanceOf(user1.address);
        //     const receiptTokenBalanceUser2AfterDeposit = await receiptToken.balanceOf(user2.address);

        //     expect(receiptTokenBalanceUser1AfterDeposit).to.be.closeTo(receiptTokenBalanceUser2AfterDeposit, 20000);
        // })
        // it('Should withdraw USDC from King - resulting in receipt token balance returning to zero', async () => {
        //     await King.withdrawUserFunds(user1.address);

        //     const receiptTokenBalanceAfterWithdrawal = await receiptToken.balanceOf(user1.address);

        //     expect(receiptTokenBalanceAfterWithdrawal).to.equal(0);
        // })
        // it('Should return USDC to user 1, resulting in their USDC balance > 0', async () => {
        //     var usdcBalance3 = await usdc.balanceOf(user1.address);

        //     expect(usdcBalance3).to.be.gt(0);
        // })
        // it('Should be the case that user 2 now holds all receipt tokens', async () => {
        //     var supply = await King.totalSupply()
        //     const receiptTokenBalanceAfterWithdrawal = await receiptToken.balanceOf(user2.address);
        //     expect(receiptTokenBalanceAfterWithdrawal).to.equal(supply);
        // })
    })
})

