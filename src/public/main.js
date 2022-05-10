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
    //const networkId = await web3.eth.net.getId();
    //const networkData = Four_In_A_Chain.networks[networkId]
    gameContract = new web3.eth.Contract(gameAbi, "0x39E19305b3314dbE8CC521f0d9369fA113b0D1bc");
    initialised = true;
    console.log(gameContract);
}

const testContract = async () => {
    if (!initialised) {
        await init();
    }
    console.log(gameContract.methods);

    /*
    let options = {
        fromBlock: 0
    };
    
    let subscription = web3.eth.subscribe('logs', options,(err,event) => {
        if (!err)
        console.log(event)
    });

    subscription.on('GameStarted', event => console.log(event));
    */

    var returnvalue = await gameContract.methods.joinGame().send({from: selectedAccount, gas: "200000", value:"2000000000000000000"}).on("receipt", function(receipt){
        console.log(receipt)
        }).on('error', function(error, receipt) {
            console.log(error);
        });
    console.log(returnvalue)
};
