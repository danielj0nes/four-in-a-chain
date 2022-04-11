// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract Four_In_A_Chain {




	/// EVENTS ///
	event GameStarted(address indexed player1, address indexed player2);

    event Error(address indexed player1, string error);

	///event MovePerformed(address indexed mover, uint256 gameId, uint8 row);

	///event GameWon(address indexed winner, uint256 gameId);

    uint public lastBlock;
    uint public gameID;
    uint constant bet = 2;

    modifier BetAmount {
        if(msg.value != bet) {
            emit Error(msg.sender, "Betting amount is 2 ether");
        }
        _;
    }

    struct Game {
		address player1;
		address player2;
        bool NoGameInitiated;
        bool GameInitiated;
		bool GameInProgress;
        bool GameEnded;
        uint8[6][7] board;
    }

    mapping(uint => Game) games;
 
    ///function getBoard(int ind) public view returns (uint8[6][7]) {
    ///    return games[ind].board;
    ///    }

    function joinGame() public payable BetAmount returns (uint ind, address p1, address p2) {
        Game storage g = games[gameID];
        if (g.GameInitiated == false){
            g.player1 = msg.sender;
            g.GameInitiated == true;
        }
        else {
            require(msg.sender != g.player1, "You can't play against yourself!");
            g.player2 = msg.sender;
            g.GameInProgress = true;
            emit GameStarted(g.player1,g.player2);
            gameID++;
            return (gameID, g.player1, g.player2);
        }
        
    }

}
