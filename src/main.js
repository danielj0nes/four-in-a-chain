const Web3 = require("web3");

// Connect to the blockchain (in this case our testnet)
const TESTNET = "http://127.0.0.1:8545";
const web3 = new Web3(TESTNET);
web3.eth.getBlockNumber(function (error, result) {
    console.log(result);
  })

const ethEnabled = () => {
    if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
        return true;
    }
    return false;
}