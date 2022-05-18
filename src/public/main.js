// Declarations (this needs refactoring)
let selectedAccount
let gameContract
let gameAbi
let walletDiv
let gameByteCode
let contractInstance
let contractDeployed = false
let initialised = false
let playerCount = 0
let currentGameId = 0
// Since we serve the abi + bytecode, we need to fetch them
fetch('four-in-a-chain-bytecode.json')
    .then(res => res.json())
    .then(obj => gameByteCode = obj)
fetch('four-in-a-chain_abi.json')
    .then(res => res.json())
    .then(obj => gameAbi = obj)

// Essentially just 'connect wallet' functionality
// Creates the web3 instance for the client session
const init = async () => {
    const provider = window.ethereum
    if (typeof provider !== 'undefined') {
        // Ensure metamask is installed
        provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount = accounts[0]
                walletDiv = document.getElementById('wallet-id')
                walletDiv.textContent = `${selectedAccount}`
                console.log(`selected account ${selectedAccount}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // Disable this when debugging, causes lots of issues
    window.ethereum.on('accountsChanged', function (accounts) {
        selectedAccount = accounts[0]
        try {
            walletDiv = document.getElementById('wallet-id')
            walletDiv.textContent = `${selectedAccount}`
        } catch {
            console.log()
        }
    })

    web3 = new Web3(provider)
    // Define contracts here
    gameContract = new web3.eth.Contract(gameAbi, selectedAccount)
    initialised = true
}
// Deploys the main game contract and returns contractDeployed true on success
const deployContract = async () => {
    // Create the deployed contract instance
    contractInstance = await gameContract.deploy({
        data: gameByteCode['object']
    })
        .send({
            from: selectedAccount
        })
        .on('receipt', function (receipt) {
            console.log('Contract deployed successfully')
            contractDeployed = true
        })
        .on('error', function (error, receipt) {
            console.log(error)
            contractDeployed = false
        })
}
const joinGame = async () => {
    if (!initialised) {
        alert('Connect a wallet')
    } else {
        if (!contractDeployed) {
            await deployContract()
        }
        // Not sure about this one
        web3.eth.handleRevert = true
        // Join the game from the current account and pay the bet amount
        if (playerCount < 2) {
            try {
                await contractInstance.methods.joinGame().send({
                    from: selectedAccount,
                    value: Web3.utils.toWei('2', 'ether')
                })
                    .on('receipt', function (receipt) {
                        console.log(receipt)
                    })
                    .on('error', function (error) {
                        console.log(error)
                    })
                playerCount += 1
                if (playerCount === 2) {
                    // Hacky, I know, but we need to preserve state and we hate CIA frameworks
                    $('body').load('http://localhost:8888/four-in-a-chain')
                    playerCount = 0
                    currentGameId += 1
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}
