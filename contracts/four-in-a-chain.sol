// SPDX-License-Identifier: GPL-3.0
import "hardhat/console.sol";
pragma solidity >=0.7.0 <0.9.0;


contract Four_In_A_Chain {


    // Game-related variables
    uint256 internal gameCount = 0;
    uint constant bet = 2 ether;
    enum State {Initiated, InProgress, Ended}
    enum gameEnding{Win, Tie, Withdrawal, Timeout, NoOpponent}
    mapping(uint => Game) games;
    uint private timeToPlay = 60 seconds;


    // Randomness variables (may not need all of them)
    address private minerHash;
    uint internal blockNum;
    bytes32 private blockHash;
    uint256 private randNum;

    // Modifiers

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
    /* To remove once we're sure we do not need it
    function getBoard(uint ID) public view returns (uint[7][6] memory board) {
        return games[ID].board;
    }
    */


    function makeMove(uint ID, uint col) public {
        Game storage g = games[ID];
        bool weshouldcheckforawinner = false;
        require(col >= 0 && col <= 6, "Out of board bounds! Enter a number between 0 and 6");
        uint row = 0;
        // select the available row at the specified column
        while (row <= 5 && g.board[row][col] != 0) {
            row++;
        }
        require(row <= 5, "This column is filled. Choose another column.");
        // place chip in the specified column
        if (msg.sender == g.player1 && g.isPlayer1Turn == true) {
            g.board[row][col] = 1;
            g.chipsCount++;
            g.isPlayer1Turn = false;
            weshouldcheckforawinner = true;
        } else if (msg.sender == g.player2 && g.isPlayer1Turn == false) {
            g.board[row][col] = 2;
            g.chipsCount++;
            g.isPlayer1Turn = true;
            weshouldcheckforawinner = true;
        } else {
            console.log("It was the bad player");
        }
        if (weshouldcheckforawinner){

            //CheckFor Winner
            uint chip_row = row;
            uint chip_col = col;
            //HorizontalCheck
            //chip_row and chip_col are never tampered with
            uint r = chip_row;
            uint c = chip_col;
            uint chipCounter = 1;
            row = r;
            col = c;
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
                g.gameWinner = payable(msg.sender);
                g.gameState = State.Ended;
                g.gameWinner.transfer(bet+bet*90/100);
                address payable gameLoser;
                msg.sender==g.player1? gameLoser = payable(g.player2) : gameLoser = payable(g.player1);
                gameLoser.transfer(bet*10/100);
            }
            if (g.gameState == State.InProgress) {
                //Vertical check
                chipCounter = 1;
                r = chip_row;
                c = chip_col;

                row = r;
                col = c;
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
                    g.gameWinner = payable(msg.sender);
                    g.gameState = State.Ended;
                    g.gameWinner.transfer(bet+bet*90/100);
                    address payable gameLoser;
                    msg.sender==g.player1? gameLoser = payable(g.player2) : gameLoser = payable(g.player1);
                    gameLoser.transfer(bet*10/100);
                }
            }
            if (g.gameState == State.InProgress) {
                //First diagonal
                
                chipCounter = 1;
                r = chip_row;
                c = chip_col;
                row = r;
                col = c;
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
                    g.gameWinner = payable(msg.sender);
                    g.gameState = State.Ended;
                    g.gameWinner.transfer(bet+bet*90/100);
                    address payable gameLoser;
                    msg.sender==g.player1? gameLoser = payable(g.player2) : gameLoser = payable(g.player1);
                    gameLoser.transfer(bet*10/100);
                }
            }
            if (g.gameState == State.InProgress) {
                chipCounter = 1;
                r = chip_row;
                c = chip_col;
                row = r;
                col = c;
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
                    g.gameWinner = payable(msg.sender);
                    g.gameState = State.Ended;
                    g.gameWinner.transfer(bet+bet*90/100);
                    address payable gameLoser;
                    msg.sender==g.player1? gameLoser = payable(g.player2) : gameLoser = payable(g.player1);
                    gameLoser.transfer(bet*10/100);
                }
            }
            //Check for a tie
            if(g.chipsCount>=42 && g.gameState != State.Ended){
                address payable tiedPlayer1 = payable(g.player1);
                address payable tiedPlayer2 = payable(g.player2);
                g.gameState = State.Ended;
                tiedPlayer1.transfer(bet);
                tiedPlayer2.transfer(bet);
            }
            g.timeout = block.timestamp+timeToPlay;
        }
    }


    function joinGame() public payable returns(uint ID) {
        if (msg.value == bet){
            console.log(gameCount);
            if (gameCount == 0) {
                gameCount++;
                Game storage g = games[gameCount];
                g.player1=msg.sender;
                g.gameState=State.Initiated;
                g.chipsCount=0;
                console.log(msg.sender);
                return g.gameID;
            }
            else {
                Game storage g = games[gameCount];
                if (g.gameState == State.InProgress || g.gameState == State.Ended) {
                    gameCount++;
                    g.player1=msg.sender;
                    g.gameState=State.Initiated;
                    g.chipsCount=0;
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
                    console.log(g.player1, g.player2);
                }
            return g.gameID;
            }
        }
        else{
            console.log("Not good bet amount");
        }
    }



    /*Different usages of the quitGame function :
    1. to quit the game if no opponent has been found. The player is refunded.
    2. To quit game if your opponent is timeout
        When a player sees that the other is taking too much time, he can quit and wins the game.
        Time for timeout is reset at each move.
    3. To withdraw.
        If a player quits the game when it is in progress and the other player is not intime out,
        it is considered a withdrawal. The other player wins.
    */
    function quitGame(uint id) public {
        Game storage g = games[id];
        require(g.gameState != State.Ended,
            "The game is over already !");
        if (g.gameState == State.Initiated){
            g.gameState = State.Ended;
            address payable lonelyPlayer = payable(g.player1);
            lonelyPlayer.transfer(bet);
        }
        else if (g.gameState == State.InProgress
        && g.timeout <= block.timestamp
        && msg.sender==g.player1 && g.isPlayer1Turn==false || msg.sender==g.player2 && g.isPlayer1Turn==true){
            msg.sender == g.player1? g.gameWinner=payable(g.player1) : g.gameWinner = payable(g.player2);
            g.gameState = State.Ended;
            g.gameWinner.transfer(2*bet);
        }
        else {
            msg.sender == g.player1? g.gameWinner=payable(g.player2) : g.gameWinner = payable(g.player1);
            g.gameState = State.Ended;
            g.gameWinner.transfer(2*bet);
        }
    }
}



