let selectedAccount;
let gameContract;
let gameAbi;
let initialised = false;
let walletDiv;
let gameByteCode;
let contractInstance;

fetch("four-in-a-chain-bytecode.json")
  .then(res => res.json())
  .then(obj => gameByteCode = obj)
fetch("four-in-a-chain_abi.json")
    .then(res => res.json())
    .then(obj => gameAbi = obj)


const init = async () => {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      // Ensure metamask is installed
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
            selectedAccount = accounts[0];
            walletDiv = document.getElementById('wallet-id');
            walletDiv.textContent = `${selectedAccount}`
            console.log(`selected account ${selectedAccount}`);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    // Disable this when debugging, causes lots of issues

    window.ethereum.on("accountsChanged", function(accounts) {
        selectedAccount = accounts[0];
        walletDiv = document.getElementById('wallet-id');
        walletDiv.textContent = `${selectedAccount}`
        console.log(`selected account changed to ${selectedAccount}`);
    });

    web3 = new Web3(provider);
    // First create the instance of the game contract using the ABI
    gameContract = new web3.eth.Contract(gameAbi, selectedAccount);
    // const networkId = await web3.eth.net.getId();
    initialised = true;
}

const deployContract = async () => {
    // Create the deployed contract instance
    if (!initialised) {
        await init();
    }
    contractInstance = await gameContract.deploy({
        data: gameByteCode["object"]
    })
    .send({
        from: selectedAccount
    })
    .then()
    console.log("Contract deployed successfully");
}
const joinGame = async () => {
    web3.eth.handleRevert = true
    let x = await contractInstance.methods.joinGame().send({
        from: selectedAccount,
        value: Web3.utils.toWei("2", "ether")
    })
    .on("receipt", function(receipt) {
        console.log(receipt);
    })
    console.log(x)
}
    // Execute the initGame function of the contract
    

    /*
    gameContract.methods.store("1").send({from: selectedAccount, gas: "200000"}).on("receipt", function(receipt){
        console.log(receipt)
        })
    */ 
