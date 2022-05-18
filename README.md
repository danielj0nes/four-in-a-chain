# Four in a Chain
Four in a Chain is a custom implementation of the classic "Four in a Row" game.
In our implementation, users can offer a currency stake (e.g., 1 ETH) that another player has to then match. The winner receives double their original stake.

## Group Hera Members
* Artem Vasilev
* Daniel Gordon Jones
* Davide Busolin
* David Pierre Sébastien Lebrec
* Euxane Célia Marie Vaz Pinto
* Turki Alahmadi

## Project details
* Web server/routing using Node.js and Koa
* Web3.js to interact with the blockchain over HTTP
* All contracts wrote and compiled with Solidity
* No CIA frameworks (pure HTML/CSS/JS)

## Building the project
1. First clone the project and run "npm install" to download the dependencies
1. Launch the start_testnet.sh script
1. On a new terminal launch the connect_testnet.sh script
1. (Optionally but recommended) start the miner with "miner.start(number_of_threads)"
1. In the src/ directory, run "npm start" to launch the web server (default port 8888)

## Playing the game
1. Ensure MetaMask is installed with at least 2 funded accounts (you can generate funds by running the miner on the testnet)
1. Connect a wallet
1. Initialise a game (this deploys an instance of the contract and joins it with the current account)
1. Join the game with the other account
1. Make moves; each move is a transaction validated by the smart contract that has to be confirmed with the correct account
1. The winner receives the 2 ETH (currently capped) from the loser + their own 2 ETH back
