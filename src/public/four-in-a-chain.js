let selectedAccount;
let gameContract;
let gameAbi;
let initialised = false;
let walletDiv;
fetch("four-in-a-chain_abi.json")
  .then(res => res.json())
  .then(obj => gameAbi = obj)

// This only works for one concurrent game at a time
const checkAccountInGame = async () => {
  fetch('/lobby/ready')
      .then(res => res.json())
      .then(data => {
        // Once two wallets are connected
        if (Object.keys(data).length === 2) {
          let wallet1 = Object.keys(data)[0];
          let wallet2 = Object.keys(data)[1];
          if(selectedAccount != wallet1 && selectedAccount != wallet2){
            alert("The account you selected is not in the lobby at the moment")
          } else {
            console.log("account lobby check passed")
          }
        } 

        else { alert("You're not in a valid lobby at the moment") }
          //redirect to lobby screen?
      })
}

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
            checkAccountInGame();
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
        checkAccountInGame();
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