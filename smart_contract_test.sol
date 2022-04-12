// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Four_In_A_Chain {

	/// EVENTS ///
	event GameStarted(address indexed player1, address indexed player2);
    event playerTurn(address indexed player1, address indexed player2);
    event Error(address player1, string error);
	event MoveMade(address indexed player, uint ID, uint8 column);
	event GameWon(address indexed winner, uint256 gameId);

    // Game-related variables
    uint256 public gameCount =0;
    uint constant bet = 2 ether;
    enum State {Initiated, InProgress, Ended}
    mapping(uint => Game) games;

    // Randomness variables (may not need all of them)
    address private minerHash;
    uint public blockNum;
    bytes32 private blockHash;
    uint256 private randNum;

    // Modifiers
    modifier BetAmount {
        require(msg.value == bet, "Betting amount is 2 ether");
        _;
    }

    modifier yourTurn(uint ID) {
        Game storage g = games[ID];
        require(msg.sender == g.player1 || msg.sender == g.player2, "You're not part of this game!");
        if (g.isPlayer1Turn == true) {
            require(msg.sender == g.player1, "It's player 1 turn");
        }
        else {
            require(msg.sender == g.player2, "It's player 2 turn");
        }
        _;
    }

    struct Game {
        uint gameID;
		address player1;
		address player2;
        uint8[6][7] board;
        bool isPlayer1Turn;
        State gameState;
    }

    function getBoard(uint ID) public view returns (uint8[6][7] memory board) {
        return games[ID].board;
    }

    function addGame(address p1, address p2) internal {
        gameCount++;
        uint8[6][7] memory board;
        State gameState;
        gameState = State.Initiated;
        games[gameCount] = Game(gameCount, p1, p2, board, true, gameState);
    }

    function makeMove(uint ID, uint8 col) public yourTurn(ID) {
        Game storage g = games[ID];
        require(g.gameState == State.InProgress, "Game has not yet started or has ended already!");
        require(col >= 0 && col <= 6, "Out of board bounds! Enter a number between 0 and 6");
        uint8 row = 5;
        // select the available row at the specified column
        while (row >= 0 && g.board[row][col] != 0) {
            row--;
        }
        require(row >= 0, "The column is filled. Choose another column.");
        // place chip in the specified column
        if (msg.sender == g.player1) {
            g.board[row][col] = 1;
        } else {
            g.board[row][col] = 2;
        }
        if (g.isPlayer1Turn == true) {
            g.isPlayer1Turn = false;
            emit MoveMade(g.player1, g.gameID, col);
        }
        else {
            g.isPlayer1Turn = true;
            emit MoveMade(g.player2, g.gameID, col);
        }
        checkForWinner(row, col, ID);
    }
    // Maybe not needed?
    function startGame(uint ID) public {
        emit GameStarted(games[ID].player1,games[ID].player2);
        //emit playerTurn
    }

    function joinGame() public payable BetAmount returns(uint ID) {
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
            /// randomly choose first player to play
            blockNum = block.number;
            //blockHash = blockhash(blockNum);
            //minerHash = block.coinbase;
            //randNum = uint(blockHash ^ bytes32(uint256(minerHash) << 96));
            g.isPlayer1Turn = (blockNum % 2) == 0;
            // change game state and start game
            g.gameState = State.InProgress;
            startGame(g.gameID);
            emit GameStarted(g.player1,g.player2);
        }
        return g.gameID;
    }


    //Call the functions to check each direction (4 are needed)
    //Missing: something to stop the other functions to be executed if the game is finished already.
    function checkForWinner(uint chip_row, uint chip_col, uint id) internal {
        horizontalCheck(chip_row, chip_col, id);
        downCheck(chip_row, chip_col, id);
        downLeftUpRightCheck(chip_row, chip_col, id);
        downRightUpLeftCheck(chip_row, chip_col, id);
    }

    /*Each function, starting from the location of the last played chip :
     1. Goes to the chip from the same player which is the furthest away possible in a direction
     2. Checks wether that chip is located in a square where it is possible to have a 4 in a row
     3. If yes, calls the connectFourCheck while specifiying the direction in which the 4 in a row should be checked
    */
    function horizontalCheck(uint r, uint c, uint id) internal {
        Game memory g = games[id];
        while(g.board[r][c+1] == g.board[r][c]) {
            c=c+1;
        }
        if (r >= 3){
            connectFourCheck(id, -1, 0, r, c);
        }
    }
    function downCheck (uint r, uint c, uint id) internal {
        if (r>=3){
            connectFourCheck(id, 0, -1, r, c);
        }
    }
    function downLeftUpRightCheck(uint r, uint c, uint id) internal {
        Game memory g = games[id];
        while(g.board[r+1][c+1] == g.board[r][c]){
            r=r+1;
            c=c+1;
        }
        if (c>=3 && r>=3){
            connectFourCheck(id, -1, -1, r, c);
        }
    }
    function downRightUpLeftCheck(uint r, uint c, uint id) internal {
        Game memory g = games[id];
        while(g.board[r+1][c-1] == g.board[r][c]){
            r=r+1;
            c=c-1;
        }
        if (c<=3 && r>=3){
            connectFourCheck(id, -1, 1, r, c);
        }
    }
    /*General function that will move to the direction specified and check for consecutive tokens. If there are
        four consecutive tokens, the GameWon event is emitted and the game is ended.
    */
    function connectFourCheck(uint id, int row_direction, int column_direction, uint row, uint column) internal {
        Game memory g = games[id];

        uint chipCounter = 1;
        uint rowPlusDir = uint(int(row)+int(row_direction));
        uint colPlusDir = uint(int(column)+int(column_direction));
        while(g.board[row][column] == g.board[rowPlusDir][colPlusDir]){
            chipCounter++;
            rowPlusDir = uint(int(row)+int(row_direction));
            colPlusDir = uint(int(column)+int(column_direction));
        }
        if (chipCounter >= 4){
            address winnerplayer = g.player2;
            if (g.isPlayer1Turn){
                winnerplayer = g.player1;
            }
            emit GameWon(winnerplayer, g.gameID);
            g.gameState = State.Ended;
        }
    }

}
