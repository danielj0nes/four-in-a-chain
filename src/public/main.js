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

    /*
    //appears to list past events until the moment of the button click
    gameContract.events.GameStarted({
        fromBlock: 0
    }, function(error, event){ console.log(event); })
    //.on('data', function(event){
    //    console.log(event);
    //})
    .on('error', console.error);

    const eventEvents = () => {
        console.log(`Listening Transfer events`);
        contractInstance.events
            .Transfer()
            .on("data", (event) => console.log(event))
            .on("error", (error) => console.log(error));
    }
    eventEvents();
    */

    //From https://parv3213.medium.com/understanding-web3-events-6524c06b669f
    const eventEvents = () => {
        console.log(`Listening GameStarted events`);
        gameContract.events
            .GameStarted()
            .on("data", (event) => console.log(event))
            .on("error", (error) => console.log(error));
    }
    eventEvents();

    const eventOnce = () => {
        gameContract.once("GameStarted", (error, event) => {
            if(!error) console.log(event);
            else console.log(`Error: ${error}`);
        })
    }
    eventOnce();
}

const testContract = async () => {
    if (!initialised) {
        await init();
    }
    console.log(gameContract.methods);
    

    var returnvalue = await gameContract.methods.joinGame().send({from: selectedAccount, gas: "200000", value:"2000000000000000000"}).on("receipt", function(receipt){
        console.log(receipt)
        }).on('error', function(error, receipt) {
            console.log(error);
        });
    //console.log(returnvalue) //seems to be same as receipt
};
