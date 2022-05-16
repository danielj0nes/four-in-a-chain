let selectedAccount;
let gameContract;
let gameAbi;
let initialised = false;
let walletDiv;
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
    window.ethereum.on("accountsChanged", function(accounts) {
        selectedAccount = accounts[0];
        walletDiv = document.getElementById('wallet-id');
        walletDiv.textContent = `${selectedAccount}`
        console.log(`selected account changed to ${selectedAccount}`);
    });
    const web3 = new Web3(provider);
    // const networkId = await web3.eth.net.getId();
    gameContract = new web3.eth.Contract(gameAbi, selectedAccount);
    initialised = true;
    console.log(gameContract);
}


const btn = document.getElementById('connect-btn');
const walletIdDiv = document.getElementById('wallet-id');
let playerAmount;
btn.addEventListener('click', () => {
  // 👇️ hide button
  btn.style.display = 'none';

  // 👇️ show div
  const connected = document.getElementById('connected-sign');
  connected.style.display = 'block';
});