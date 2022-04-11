{\rtf1\ansi\ansicpg1252\cocoartf2513
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red79\green123\blue61;\red0\green0\blue0;\red172\green172\blue193;
\red70\green137\blue204;\red212\green212\blue212;\red167\green197\blue152;\red253\green181\blue13;\red167\green44\blue49;
\red45\green175\blue118;\red13\green102\blue149;\red194\green126\blue101;\red31\green133\blue64;\red140\green108\blue11;
}
{\*\expandedcolortbl;;\cssrgb\c37647\c54510\c30588;\csgray\c0\c0;\cssrgb\c72941\c73333\c80000;
\cssrgb\c33725\c61176\c83922;\cssrgb\c86275\c86275\c86275;\cssrgb\c70980\c80784\c65882;\cssrgb\c100000\c75686\c2745;\cssrgb\c72157\c25098\c25098;
\cssrgb\c19608\c72941\c53725;\cssrgb\c0\c47843\c65098;\cssrgb\c80784\c56863\c47059;\cssrgb\c12941\c58039\c31765;\cssrgb\c61961\c49412\c3137;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl360\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 // SPDX-License-Identifier: GPL-3.0\cf4 \strokec4 \
\pard\pardeftab720\sl360\partightenfactor0
\cf5 \strokec5 pragma\cf4 \strokec4  \cf5 \strokec5 solidity\cf4 \strokec4  \cf6 \strokec6 >=\cf7 \strokec7 0.7.0\cf4 \strokec4  \cf6 \strokec6 <\cf7 \strokec7 0.9.0\cf6 \strokec6 ;\cf4 \strokec4 \
\cf5 \strokec5 contract\cf4 \strokec4  Four_In_A_Chain \cf6 \strokec6 \{\cf4 \strokec4 \
\
\
\
\
    \cf2 \strokec2 /// EVENTS ///\cf4 \strokec4 \
    \cf5 \strokec5 event\cf4 \strokec4  GameStarted\cf6 \strokec6 (\cf5 \strokec5 address\cf4 \strokec4  \cf8 \strokec8 indexed\cf4 \strokec4  player1\cf6 \strokec6 ,\cf4 \strokec4  \cf5 \strokec5 address\cf4 \strokec4  \cf8 \strokec8 indexed\cf4 \strokec4  player2\cf6 \strokec6 );\cf4 \strokec4 \
\
    \cf5 \strokec5 event\cf4 \strokec4  \cf9 \strokec9 Error\cf6 \strokec6 (\cf5 \strokec5 address\cf4 \strokec4  \cf8 \strokec8 indexed\cf4 \strokec4  player1\cf6 \strokec6 ,\cf4 \strokec4  \cf5 \strokec5 string\cf4 \strokec4  error\cf6 \strokec6 );\cf4 \strokec4 \
\
    \cf2 \strokec2 ///event MovePerformed(address indexed mover, uint256 gameId, uint8 row);\cf4 \strokec4 \
\
    \cf2 \strokec2 ///event GameWon(address indexed winner, uint256 gameId);\cf4 \strokec4 \
\
    \cf5 \strokec5 uint\cf4 \strokec4  \cf10 \strokec10 public\cf4 \strokec4  lastBlock\cf6 \strokec6 ;\cf4 \strokec4 \
    \cf5 \strokec5 uint\cf4 \strokec4  \cf10 \strokec10 public\cf4 \strokec4  gameID\cf6 \strokec6 ;\cf4 \strokec4 \
    \cf5 \strokec5 uint\cf4 \strokec4  \cf5 \strokec5 constant\cf4 \strokec4  bet \cf6 \strokec6 =\cf4 \strokec4  \cf7 \strokec7 2\cf6 \strokec6 ;\cf4 \strokec4 \
\
    \cf5 \strokec5 modifier\cf4 \strokec4  BetAmount \cf6 \strokec6 \{\cf4 \strokec4 \
        \cf8 \strokec8 if\cf6 \strokec6 (\cf11 \strokec11 msg\cf6 \strokec6 .\cf4 \strokec4 value \cf6 \strokec6 !=\cf4 \strokec4  bet\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4 \
            \cf5 \strokec5 emit\cf4 \strokec4  \cf9 \strokec9 Error\cf6 \strokec6 (\cf11 \strokec11 msg\cf6 \strokec6 .\cf4 \strokec4 sender\cf6 \strokec6 ,\cf4 \strokec4  \cf12 \strokec12 "Betting amount is 2 ether"\cf6 \strokec6 );\cf4 \strokec4 \
        \cf6 \strokec6 \}\cf4 \strokec4 \
        _\cf6 \strokec6 ;\cf4 \strokec4 \
    \cf6 \strokec6 \}\cf4 \strokec4 \
\
    \cf5 \strokec5 struct\cf4 \strokec4  Game \cf6 \strokec6 \{\cf4 \strokec4 \
        \cf5 \strokec5 address\cf4 \strokec4  player1\cf6 \strokec6 ;\cf4 \strokec4 \
        \cf5 \strokec5 address\cf4 \strokec4  player2\cf6 \strokec6 ;\cf4 \strokec4 \
        \cf5 \strokec5 bool\cf4 \strokec4  NoGameInitiated\cf6 \strokec6 ;\cf4 \strokec4 \
        \cf5 \strokec5 bool\cf4 \strokec4  GameInitiated\cf6 \strokec6 ;\cf4 \strokec4 \
        \cf5 \strokec5 bool\cf4 \strokec4  GameInProgress\cf6 \strokec6 ;\cf4 \strokec4 \
        \cf5 \strokec5 bool\cf4 \strokec4  GameEnded\cf6 \strokec6 ;\cf4 \strokec4 \
        \cf5 \strokec5 uint8\cf6 \strokec6 [\cf7 \strokec7 6\cf6 \strokec6 ][\cf7 \strokec7 7\cf6 \strokec6 ]\cf4 \strokec4  board\cf6 \strokec6 ;\cf4 \strokec4 \
    \cf6 \strokec6 \}\cf4 \strokec4 \
\
    \cf5 \strokec5 mapping\cf6 \strokec6 (\cf5 \strokec5 uint\cf4 \strokec4  => Game\cf6 \strokec6 )\cf4 \strokec4  games\cf6 \strokec6 ;\cf4 \strokec4 \
 \
    \cf2 \strokec2 ///function getBoard(int ind) public view returns (uint8[6][7]) \{\cf4 \strokec4 \
    \cf2 \strokec2 ///    return games[ind].board;\cf4 \strokec4 \
    \cf2 \strokec2 ///    \}\cf4 \strokec4 \
\
    \cf5 \strokec5 function\cf4 \strokec4  joinGame\cf6 \strokec6 ()\cf4 \strokec4  \cf10 \strokec10 public\cf4 \strokec4  \cf10 \strokec10 payable\cf4 \strokec4  BetAmount \cf13 \strokec13 returns\cf4 \strokec4  \cf6 \strokec6 (\cf5 \strokec5 uint\cf4 \strokec4  ind\cf6 \strokec6 ,\cf4 \strokec4  \cf5 \strokec5 address\cf4 \strokec4  p1\cf6 \strokec6 ,\cf4 \strokec4  \cf5 \strokec5 address\cf4 \strokec4  p2\cf6 \strokec6 )\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4 \
        Game \cf14 \strokec14 storage\cf4 \strokec4  g \cf6 \strokec6 =\cf4 \strokec4  games\cf6 \strokec6 [\cf4 \strokec4 gameID\cf6 \strokec6 ];\cf4 \strokec4 \
        \cf8 \strokec8 if\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 g\cf6 \strokec6 .\cf4 \strokec4 GameInitiated \cf6 \strokec6 ==\cf4 \strokec4  \cf5 \strokec5 false\cf6 \strokec6 )\{\cf4 \strokec4 \
            g\cf6 \strokec6 .\cf4 \strokec4 player1 \cf6 \strokec6 =\cf4 \strokec4  \cf11 \strokec11 msg\cf6 \strokec6 .\cf4 \strokec4 sender\cf6 \strokec6 ;\cf4 \strokec4 \
            g\cf6 \strokec6 .\cf4 \strokec4 GameInitiated \cf6 \strokec6 ==\cf4 \strokec4  \cf5 \strokec5 true\cf6 \strokec6 ;\cf4 \strokec4 \
        \cf6 \strokec6 \}\cf4 \strokec4 \
        \cf8 \strokec8 else\cf4 \strokec4  \cf6 \strokec6 \{\cf4 \strokec4 \
            \cf11 \strokec11 require\cf6 \strokec6 (\cf11 \strokec11 msg\cf6 \strokec6 .\cf4 \strokec4 sender \cf6 \strokec6 !=\cf4 \strokec4  g\cf6 \strokec6 .\cf4 \strokec4 player1\cf6 \strokec6 ,\cf4 \strokec4  \cf12 \strokec12 "You can't play against yourself!"\cf6 \strokec6 );\cf4 \strokec4 \
            g\cf6 \strokec6 .\cf4 \strokec4 player2 \cf6 \strokec6 =\cf4 \strokec4  \cf11 \strokec11 msg\cf6 \strokec6 .\cf4 \strokec4 sender\cf6 \strokec6 ;\cf4 \strokec4 \
            g\cf6 \strokec6 .\cf4 \strokec4 GameInProgress \cf6 \strokec6 =\cf4 \strokec4  \cf5 \strokec5 true\cf6 \strokec6 ;\cf4 \strokec4 \
            \cf5 \strokec5 emit\cf4 \strokec4  GameStarted\cf6 \strokec6 (\cf4 \strokec4 g\cf6 \strokec6 .\cf4 \strokec4 player1\cf6 \strokec6 ,\cf4 \strokec4 g\cf6 \strokec6 .\cf4 \strokec4 player2\cf6 \strokec6 );\cf4 \strokec4 \
            gameID\cf6 \strokec6 ++;\cf4 \strokec4 \
            \cf13 \strokec13 return\cf4 \strokec4  \cf6 \strokec6 (\cf4 \strokec4 gameID\cf6 \strokec6 ,\cf4 \strokec4  g\cf6 \strokec6 .\cf4 \strokec4 player1\cf6 \strokec6 ,\cf4 \strokec4  g\cf6 \strokec6 .\cf4 \strokec4 player2\cf6 \strokec6 );\cf4 \strokec4 \
        \cf6 \strokec6 \}\cf4 \strokec4 \
        \
    \cf6 \strokec6 \}\cf4 \strokec4 \
\
\pard\pardeftab720\sl360\partightenfactor0
\cf6 \strokec6 \}\cf4 \strokec4 \
}