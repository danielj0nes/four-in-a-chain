let selectedAccount;
let gameContract;
let gameAbi;
let initialised = false;

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
            console.log(`selected account ${selectedAccount}`);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    window.ethereum.on("accountsChanged", function(accounts) {
        selectedAccount = accounts[0];
        console.log(`selected account changed to ${selectedAccount}`);
    });
    const web3 = new Web3(provider);
    // const networkId = await web3.eth.net.getId();
    gameContract = new web3.eth.Contract(gameAbi, selectedAccount);
    initialised = true;
    console.log(gameContract);
}

const testContract = async () => {
    if (!initialised) {
        await init();
    }
    console.log(gameContract.methods);
    /*
    gameContract.methods.store("1").send({from: selectedAccount, gas: "200000"}).on("receipt", function(receipt){
        console.log(receipt)
        })
    */ 
};
