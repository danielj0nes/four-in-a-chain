const playBtn = document.getElementById('find-opponent');
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

playBtn.addEventListener('click', () => {
  if (walletIdDiv.textContent) {
    fetch('/lobby/opponent-search', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        walletId: walletIdDiv.textContent
      })
    })
    fetch('/lobby/ready')
      .then(res => res.json())
      .then(data => {
        // Once two wallets are connected
        if (Object.keys(data).length === 2) {
          let wallet1 = Object.keys(data)[0];
          let wallet2 = Object.keys(data)[1];
          alert(`${wallet1} ${wallet2}`)
          window.location.href = '/four-in-a-chain';
        } 

        else { alert("Waiting for an opponent") }
        
      })
  } else {
    alert("Connect a wallet to look for an opponent")
  }
});


