const USDC_ADDRESS = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
const KING_DAPP_ADDRESS = "0xbb1472776aabdFaB4c26531363C44d407BAA699A"; //THIS IS JUST A PLACEHOLDER!
var user;

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = await provider.getSigner()

const dappContract_signer = new ethers.Contract(KING_DAPP_ADDRESS, king_dapp_abi, signer);
const dappContract_provider = new ethers.Contract(KING_DAPP_ADDRESS, king_dapp_abi, provider);

/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

//check that we are connected to Polygon/Matic network
var chainId = await checkNetworkId(provider)
if (chainId !== 137) {
  console.log("Please change to Matic network") //TODO make this an alert to the user...
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x89' }], //137 in 0x padded hexadecimal form is 0x89
    });
    window.location.reload();
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{ chainId: '0x89', rpcUrl: 'https://rpc-mainnet.maticvigil.com/' /* ... */ }],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}
let accounts = await ethereum.request({ method: 'eth_accounts' });

if (provider) {
  startApp(provider); // Initialize your app
} else {
  console.log('Please install MetaMask!');
}

async function checkNetworkId(_provider) {
  try {
    var network = await provider.getNetwork();
    return network["chainId"];
  }
  catch (error) {
    console.log(error);
  }
}

async function startApp(provider) {
  const connectButton = document.getElementById('connectButton');
  const depositETHButton = document.getElementById('depositETHButton');

  const depositButton = document.getElementById('depositButton');
  const approveButton = document.getElementById('approveButton');

  await walletButtonStateHandler();

  async function walletButtonStateHandler() {
    if (accounts.length > 0) {
      user = accounts[0];
      connectButton.classList.add("btn-success");
      connectButton.innerHTML = user;
      connectButton.disabled = true;
    } else {
      connectButton.classList.remove("btn-danger");
      connectButton.innerHTML = "Connect Wallet";
    }
  }

  connectButton.addEventListener('click', async (event) => {
    connectButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span>  Connecting ...`;
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
    }
    accounts = await ethereum.request({
      method: "eth_accounts",
    });
    await walletButtonStateHandler();

  });

  depositETHButton.addEventListener('click', async () => {
    var depositAmountETH = $("#depositAmountETH").val(); //put in some checks here? positive number, between x and y, user has enough funds...
    // var estimatedGasLimit = await dappContract_signer.estimateGas.sendTransaction({
    //   to: KING_DAPP_ADDRESS,
    //   // Convert currency unit from ether to wei
    //   value: depositAmountETH * 10 ** 18,
    //   gasLimit: parseInt(estimatedGasLimit * 1.2)
    // });
    let tx = await dappContract_signer.sendTransaction({
      to: KING_DAPP_ADDRESS,
      // Convert currency unit from ether to wei
      value: depositAmountETH * 10 ** 18
    });

    let result = await tx.wait();
    if (result) {
      $("#swapStarted").css("display", "inline-block");
      $("#swapStarted").text(`Deposit successful`);
      setTimeout(function () {
        $("#swapStarted").css("display", "none");
      }, (3 * 1000));
    }
  })

  approveButton.addEventListener('click', async () => {
    var depositAmountUSDC = $("#depositAmountUSDC").val(); //put in some checks here? positive number, between x and y, user has enough funds...
    let tx = await giveApprovalFromUser(USDC_ADDRESS, KING_DAPP_ADDRESS, ethers.utils.parseUnits(depositAmountUSDC.toString(), 6));
    let result = await tx.wait();
    if (result) {
      $("#swapStarted").css("display", "inline-block");
      $("#swapStarted").text(`Deposit approved`);
      setTimeout(function () {
        $("#swapStarted").css("display", "none");
      }, (3 * 1000));
    }
  })

  depositButton.addEventListener('click', async () => {
    var depositAmountUSDC = $("#depositAmountUSDC").val(); //put in some checks here? positive number, between x and y, user has enough funds...
    console.log(`Depositing ${depositAmountUSDC} of USDC`);
    $("#swapStarted").css("display", "inline-block");
    $("#swapStarted").text(`Depositing ${depositAmountUSDC} of USDC`);
    var estimatedGasLimit = await dappContract_signer.estimateGas.deposit(depositAmountUSDC * 10 ** 6);
    let tx = await dappContract_signer.deposit(depositAmountUSDC * 10 ** 6, { gasLimit: parseInt(estimatedGasLimit * 1.2) });
    let result = await tx.wait();
    if (result) {
      $("#swapStarted").css("display", "inline-block");
      $("#swapStarted").text(`Deposit successful`);
      setTimeout(function () {
        $("#swapStarted").css("display", "none");
      }, (3 * 1000));
    }
  })
}





async function giveApprovalFromUser(token_address, spender_address, amountIn) {
  // create a new instance of a contract
  var tokenContract = new ethers.Contract(token_address, token_abi, signer)
  // give spender_address approval to spend user's tokens
  try {
    var approved = await tokenContract.approve(spender_address, amountIn);
    return approved;

  } catch (error) {
    console.log(error)
  }
}

async function getBalance(token_address, accountOrContract) {
  // create a new instance of a contract - in web3.js >1.0.0, will have to use "new web3.eth.Contract" (uppercase C)
  try {
    var token_balance = await dappContract_provider.tokenBalanceOf(token_address, accountOrContract);
    return token_balance;
  } catch (error) {
    console.log(error)
  }
}

async function getExchangeRate(oracle_address) {
  var oracle = new ethers.Contract(oracle_address, CHAINLINK_ORACLE_ABI, provider);
  try {
    var exchangeRate = await oracle.latestAnswer();
    return exchangeRate; //returns in BigNumber format
  } catch (error) {
    console.log(error);
  }
}

async function getDecimals(token_address) {
  var tokenContract = new ethers.Contract(token_address, token_abi, provider)
  // check how many decimals that token has
  try {
    var decimals = await tokenContract.decimals();//need to catch an error here - perhaps make this it's own function!
    return decimals;
  } catch (error) {
    console.log(error);
  }
}





