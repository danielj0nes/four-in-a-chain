let selectedAccount;
let gameContract;
let gameAbi;
let initialised = false;
let walletDiv;
let gameByteCode;
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

    const web3 = new Web3(provider);
    // First create the instance of the game contract using the ABI
    gameContract = new web3.eth.Contract(gameAbi, selectedAccount);
    // const networkId = await web3.eth.net.getId();
    initialised = true;
}

const initGame = async () => {
    // Create the deployed contract instance
    if (!initialised) {
        await init();
    }
    let contractInstance = await gameContract.deploy({
        data: gameByteCode["object"]
    })
    .send({
        from: selectedAccount
    })
    .then()
    console.log(contractInstance.methods);
    // Execute the initGame function of the contract
    contractInstance.methods.initGame().send({
        from: selectedAccount
    })
    .on("receipt", function(receipt) {
        console.log(receipt);
    })

    /*
    gameContract.methods.store("1").send({from: selectedAccount, gas: "200000"}).on("receipt", function(receipt){
        console.log(receipt)
        })
    */ 
};
