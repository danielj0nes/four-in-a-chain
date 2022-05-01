let selectedAccount;
let testContract;
let testcontract;
let initialised = false;

fetch("testcontract_abi.json")
  .then(res => res.json())
  .then(obj => testcontract = obj)

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
    testContract = new web3.eth.Contract(testcontract, "0x94e999AB1Ad5C740C693D682d559e25CcD61A100");
    initialised = true;
    console.log(testContract);
}

const storeP = async () => {
    if (!initialised) {
        await init();
    }
    testContract.methods.store("1").send({from: "0x94e999AB1Ad5C740C693D682d559e25CcD61A100"}).on("receipt", function(receipt){
        console.log(receipt)
    })
        

};
