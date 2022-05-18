const playBtn = document.getElementById('find-opponent')
const conBtn = document.getElementById('connect-btn')
const walletIdDiv = document.getElementById('wallet-id')
const connected = document.getElementById('connected-sign')
const waitingSign = document.getElementById('waiting-sign')
const gameButton = document.getElementById('gameButton')

conBtn.addEventListener('click', () => {
    conBtn.style.display = 'none'
    connected.style.display = 'block'
})