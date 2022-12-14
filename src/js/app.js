const KING_DAPP_ADDRESS = "0xc599eC8b6d85D3183ccb6a2c2c11978bd3f16043";
const USDC_ADDRESS = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
var user;

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = await provider.getSigner()

const dappContract_signer = new ethers.Contract(KING_DAPP_ADDRESS, king_dapp_abi, signer);
const dappContract_provider = new ethers.Contract(KING_DAPP_ADDRESS, king_dapp_abi, provider);
var secretInput;

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
  const depositMATICButton = document.getElementById('depositMATICButton');
  const depositUsdcButton = document.getElementById('depositUsdcButton');
  const approveButton = document.getElementById('approveButton');
  currentKing.innerHTML = await dappContract_provider.getKing();
  currentMaxPaid.innerHTML = ethers.utils.formatEther(await dappContract_provider.maximumPaid());

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

  depositMATICButton.addEventListener('click', async () => {
    var depositAmountMATIC = $("#depositAmountMATIC").val();
    var tx;
    try {
      tx = await signer.sendTransaction({
        to: KING_DAPP_ADDRESS,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(depositAmountMATIC),
      });
    } catch (err) {
      $("#swapStarted").css("display", "inline-block");
      $("#swapStarted").text(err["data"]["message"]);
      setTimeout(function () {
        $("#swapStarted").css("display", "none");
      }, (5 * 1000));
      return;
    }
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
    var depositAmountUSDC = $("#depositAmountUSDC").val();
    var tx;
    try {
      tx = await giveApprovalFromUser(USDC_ADDRESS, KING_DAPP_ADDRESS, ethers.utils.parseUnits(depositAmountUSDC.toString(), 6));
    } catch (err) {
      $("#swapStarted").css("display", "inline-block");
      $("#swapStarted").text(err["data"]["message"]);
      setTimeout(function () {
        $("#swapStarted").css("display", "none");
      }, (5 * 1000));
      return;
    }
    let result = await tx.wait();
    if (result) {
      $("#swapStarted").css("display", "inline-block");
      $("#swapStarted").text(`Deposit approved`);
      setTimeout(function () {
        $("#swapStarted").css("display", "none");
      }, (3 * 1000));
    }
  })

  depositUsdcButton.addEventListener('click', async () => {
    var depositAmountUSDC = $("#depositAmountUSDC").val();
    console.log(`Depositing ${depositAmountUSDC} of USDC`);
    $("#swapStarted").css("display", "inline-block");
    $("#swapStarted").text(`Depositing ${depositAmountUSDC} of USDC`);
    var tx;
    try {
      tx = await dappContract_signer.depositUsdc(depositAmountUSDC * 10 ** 6);
    } catch (err) {
      console.log(err);
      $("#swapStarted").css("display", "inline-block");
      $("#swapStarted").text(err["data"]["message"]);
      setTimeout(function () {
        $("#swapStarted").css("display", "none");
      }, (10 * 1000));
      return;
    }
    let result = await tx.wait();
    console.log(result)
    if (result) {
      $("#swapStarted").css("display", "inline-block");
      $("#swapStarted").text(`Deposit successful`);
      setTimeout(function () {
        $("#swapStarted").css("display", "none");
      }, (5 * 1000));
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






