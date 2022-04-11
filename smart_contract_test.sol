// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract Four_In_A_Chain {

	/// EVENTS ///
	event GameStarted(address indexed player1, address indexed player2);
    event Error(address player1, string error);
	///event MovePerformed(address indexed mover, uint256 gameId, uint8 row);
	///event GameWon(address indexed winner, uint256 gameId);

    uint256 public gameCount =0;
    uint constant bet = 2 ether;
    enum State {Initiated, InProgress, Ended}
    mapping(uint => Game) games;

    uint public lastBlock;

    modifier BetAmount {
        require(msg.value == bet, "Betting amount is 2 ether");
        _;
    }

    struct Game {
        uint gameID;
		address player1;
		address player2;
        uint8[6][7] board;
        State gameState;
    }
 
    ///function getBoard(int ind) public view returns (uint8[6][7]) {
    ///    return games[ind].board;
    ///    }

    function addGame(address p1, address p2) public {
        gameCount++;
        uint8[6][7] memory board;
        State gameState;
        gameState = State.Initiated;
        games[gameCount] = Game(gameCount, p1, p2, board, gameState);
    }

    function joinGame() public payable BetAmount {
        Game storage g = games[gameCount];
        if (gameCount == 0) {
            addGame(msg.sender, address(0));
        }
        else if (g.gameState == State.InProgress || g.gameState == State.Ended) {
            addGame(msg.sender, address(0));
        }
        else if (g.gameState == State.Initiated) {
            require(msg.sender != g.player1, "You can't play against yourself!");
            g.player2 = msg.sender;
            g.gameState = State.InProgress;
            emit GameStarted(g.player1,g.player2);
        }
    }
}
