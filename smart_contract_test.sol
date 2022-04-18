// SPDX-License-Identifier: GPL-3.0
//import "hardhat/console.sol";
pragma solidity >=0.7.0 <0.9.0;


contract Four_In_A_Chain {
    
	/// EVENTS ///
	event GameStarted(address indexed player1, address indexed player2);
    //Can we remove this two ?
    //event playerTurn(address indexed player1, address indexed player2);
    //event Error(address player1, string error);
	event MoveMade(address indexed player, uint ID, uint column);
	event GameWon(address indexed winner, uint256 ID);
    event GameTied(uint256 ID);

    // Game-related variables
    uint256 public gameCount = 0;
    uint constant bet = 2 ether;
    enum State {Initiated, InProgress, Ended}
    enum gameEnding{Win, Tie, Withdrawal, Timeout}
    mapping(uint => Game) games;
    uint private timeToPlay = 500;

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
        require(g.gameState == State.InProgress, "Game has not yet started or has ended already!");
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
        uint[7][6] board;
        bool isPlayer1Turn;
        State gameState;
        address payable gameWinner;
        uint8 chipsCount;
        uint timeout;
    }

    function getBoard(uint ID) public view returns (uint[7][6] memory board) {
        return games[ID].board;
    }

    // created this function to understand the positions in the board
    function fillBoard(uint ID, uint row, uint col, uint val) public {
        Game storage g = games[ID];
        g.board[row][col] = val;
        g.chipsCount++;
    }

    function addGame(address p1, address p2) internal {
        gameCount++;
        Game storage g = games[gameCount];
        g.player1=p1;
        g.player2=p2;
        g.gameState=State.Initiated;
        g.chipsCount=0;
        g.timeout = block.timestamp+timeToPlay;
    }

    function makeMove(uint ID, uint col) public yourTurn(ID) {
        Game storage g = games[ID];
        require(col >= 0 && col <= 6, "Out of board bounds! Enter a number between 0 and 6");
        uint row = 0;
        // select the available row at the specified column
        while (row <= 5 && g.board[row][col] != 0) {
            row++;
        }
        require(row <= 5, "This column is filled. Choose another column.");
        // place chip in the specified column
        if (msg.sender == g.player1) {
            fillBoard(ID,row,col,1);
        } else {
            fillBoard(ID,row,col,2);
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
 
        if(g.chipsCount>=42 && g.gameState != State.Ended){
            gameIsTied(ID);
        }
        g.timeout = block.timestamp+timeToPlay;
    }

    function gameStatus(uint ID) public view returns(string memory status){
        Game storage g = games[ID];
        if (g.gameState == State.Initiated) {
            return "Initiated";
        }
        else if (g.gameState == State.InProgress) {
            return "In Progress";
        }
        else if (g.gameState == State.Ended) {
            return "Ended";
        }

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
            require(msg.sender != g.player1, "You have initiated a game already. Please wait for an opponent.");
            g.player2 = msg.sender;
            /// randomly choose first player to play
            blockNum = block.number;
            //blockHash = blockhash(blockNum);
            //minerHash = block.coinbase;
            //randNum = uint(blockHash ^ bytes32(uint256(minerHash) << 96));
            g.isPlayer1Turn = (blockNum % 2) == 0;
            // change game state and start game
            g.gameState = State.InProgress;
            g.timeout=block.timestamp+timeToPlay;
            emit GameStarted(g.player1,g.player2);
        }
        return g.gameID;
    }

    //Call the functions to check each direction (4 are needed)
    function checkForWinner(uint chip_row, uint chip_col, uint id) internal {
        Game storage g = games[id];
        horizontalCheck(chip_row, chip_col, id);
        if (g.gameState == State.InProgress) {
            verticalCheck(chip_row, chip_col, id);
        }
        if (g.gameState == State.InProgress) {
            downLeftUpRightCheck(chip_row, chip_col, id);
        }
        if (g.gameState == State.InProgress) {
            downRightUpLeftCheck(chip_row, chip_col, id);
        }
    }

    /*Each function, starting from the location of the last played chip :
     1. Goes to the chip from the same player which is the furthest away possible in a direction and count chips
     2. Goes the opposite direction and count chips
     3. If there is 4 chips or more, call the endOfGame function.
    */
    function horizontalCheck(uint r, uint c, uint id) internal {
        Game storage g = games[id];
        uint chipCounter = 1;
        uint row = r;
        uint col = c;
        while(c<6 && g.board[r][c+1] == g.board[r][c]) {
            chipCounter++;
            c=c+1;
        }
        r = row;
        c = col;
        while(c>0 && g.board[r][c-1] == g.board[r][c]) {
            chipCounter++;
            c=c-1;
        }
        if (chipCounter >= 4){
            endOfGameTransaction(id, gameEnding.Win);
        }
    }
    function verticalCheck (uint r, uint c, uint id) internal {
        Game storage g = games[id];
        uint chipCounter = 1;
        uint row = r;
        uint col = c;
        while(r<5 && g.board[r+1][c] == g.board[r][c]) {
            chipCounter++;
            r=r+1;
        }
        r = row;
        c = col;
        while(r>0 && g.board[r-1][c] == g.board[r][c]) {
            chipCounter++;
            r=r-1;
        }
        if (chipCounter >= 4){
            endOfGameTransaction(id, gameEnding.Win);
        }
    }
    function downLeftUpRightCheck(uint r, uint c, uint id) internal {
        Game storage g = games[id];
        uint chipCounter = 1;
        uint row = r;
        uint col = c;
        while(r<5 && c<6 && g.board[r+1][c+1] == g.board[r][c]){
            chipCounter++;
            r=r+1;
            c=c+1;
        }
        r = row;
        c = col;
        while(r>0 && c>0 && g.board[r-1][c-1] == g.board[r][c]){
            chipCounter++;
            r=r-1;
            c=c-1;
        }
        if (chipCounter >= 4){
            endOfGameTransaction(id, gameEnding.Win);
        }
    }
    function downRightUpLeftCheck(uint r, uint c, uint id) internal {
        Game storage g = games[id];
        uint chipCounter = 1;
        uint row = r;
        uint col = c;
        while(r>0 && c<6 && g.board[r-1][c+1] == g.board[r][c]){
            chipCounter++;
            r=r-1;
            c=c+1;
        }
        r = row;
        c = col;
        while(r<5 && c>0 && g.board[r+1][c-1] == g.board[r][c]){
            chipCounter++;
            r=r+1;
            c=c-1;
        }
        if (chipCounter >= 4){
            endOfGameTransaction(id, gameEnding.Win);
        }
    }

    function gameIsTied (uint id) internal{
        endOfGameTransaction(id, gameEnding.Tie);
    }

    function withdraw(uint id) public yourTurn(id) {
        endOfGameTransaction(id, gameEnding.Withdrawal);
    }

    //Alternative to having something automatically done as it cannot be done
    //Function that a player has to call himself when he thinks the other is taking too much time.
    //Time for timeout is reset at each move. 
    function askForTimeout(uint id) public {
        Game storage g = games[id];
        require(g.gameState != State.Ended, 
            "The game is over already !");
        require(msg.sender==g.player1 && g.isPlayer1Turn==false || msg.sender==g.player2 && g.isPlayer1Turn==true,
            "It's your turn to play");
        require(g.timeout <= block.timestamp, 
            "Please be a bit more patient...");
        endOfGameTransaction(id, gameEnding.Timeout);
    }

    //Last function. Emits the diverse game finish events as well as put the state as Ended
    function endOfGameTransaction(uint id, gameEnding e) internal {
        Game storage g = games[id];
        if(e==gameEnding.Withdrawal){
            msg.sender == g.player1? g.gameWinner=payable(g.player2) : g.gameWinner = payable(g.player1);
            g.gameState = State.Ended;
            emit GameWon(g.gameWinner, g.gameID);
            g.gameWinner.transfer(2*bet);
        }
        else if (e == gameEnding.Tie){
            address payable tiedPlayer1 = payable(g.player1);
            address payable tiedPlayer2 = payable(g.player2);
            g.gameState = State.Ended;
            emit GameTied(g.gameID);
            tiedPlayer1.transfer(bet);
            tiedPlayer2.transfer(bet);
        }
        else if (e == gameEnding.Win){
            g.gameWinner = payable(msg.sender);
            g.gameState = State.Ended;
            emit GameWon(g.gameWinner, g.gameID);
            g.gameWinner.transfer(bet+bet*90/100);
            address payable gameLoser;
            msg.sender==g.player1? gameLoser = payable(g.player2) : gameLoser = payable(g.player1);
            gameLoser.transfer(bet*10/100);
        }
        else if (e == gameEnding.Timeout){
            msg.sender == g.player1? g.gameWinner=payable(g.player1) : g.gameWinner = payable(g.player2);
            g.gameState = State.Ended;
            emit GameWon(g.gameWinner, g.gameID);
            g.gameWinner.transfer(2*bet);
        }
    }

}
