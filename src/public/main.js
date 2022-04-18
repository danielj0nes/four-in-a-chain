import Web3 from "web3";
import Storage from "../contracts/testcontract_abi.json";

let selectedAccount;
let testContract;
let initialised = false;

export const init = async () => {
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
    // didn't need to provide the abi
    testContract = new web3.eth.Contract(Storage, "0x94e999AB1Ad5C740C693D682d559e25CcD61A100");
    initialised = true;
}

export const storeP = async () => {
    if (!initialised) {
        await init();
    }
    return testContract.methods
        .store("1")
        .send({from: "0x94e999AB1Ad5C740C693D682d559e25CcD61A100"})
};

