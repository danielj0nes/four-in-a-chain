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
* Web server/routing using Koa
* Web blockchain functionality using web3.js
## Useful
* When using Metamask, after reverting the testnet folder to the previous commit, you have to clear the transaction history from settings - advanced - reset account, otherwise no new transactions will go through
* https://gitlab.ifi.uzh.ch/scheid/bcoln/tree/master/Solidity - Getting started guide
* Configured the testnet as per the intructions above, two default account passwords are: *123456*
* https://github.com/Web3Modal/web3modal-vanilla-js-example/blob/master/example.js
## Building the project
1. First clone the project and run "npm install"
1. Launch the start_testnet.sh script
1. On a new terminal launch the connect_testnet.sh script
1. (Optionally but recommended) start the miner with "miner.start(number_of_threads)"
1. In the src/ directory, run "npm start" to launch the web server (default port 8888)
