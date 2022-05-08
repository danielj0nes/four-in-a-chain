const gridEl = document.querySelector('.grid');
gridEl.addEventListener('click', handleClick);
const boxes = gridEl.querySelectorAll('.box');
const gameState = [];
const displayCurrentPlayer = document.querySelector('#currentPlayer')
let currentPlayer = 1;
let time = 60;
let intervalId = -1;

let finalWinner = 0;

let isStopped = false;

for (let i = 0; i < 6; i++) {
  const row = [];
  for (let j = 0; j < 7; j++) {
    row.push(0);
  }
  gameState.push(row);
}

function checkWinner() {
	const rows = 6;
	const cols = 7;
	const howMany = 4;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols - howMany + 1; j++) {
			if (gameState[i][j] == 0) {
				continue;
			}
			if (gameState[i][j] == gameState[i][j+1]
				&& gameState[i][j] == gameState[i][j+2]
				&& gameState[i][j] == gameState[i][j+3]) {
				return gameState[i][j];
			}
		}
	}
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows - howMany + 1; j++) {
			if (gameState[j][i] == 0) {
				continue;
			}
			if (gameState[j][i] == gameState[j+1][i]
				&& gameState[j][i] == gameState[j+2][i]
				&& gameState[j][i] == gameState[j+3][i]) {
				return gameState[j][i];
			}
		}
	}
	for (let i = 0; i < cols - howMany + 1; i++) {
		for (let j = 0; j < rows - howMany + 1; j++) {
			if (gameState[j, i] == 0) {
				continue;
			}
			if (gameState[j][i] == gameState[j+1][i+1]
				&& gameState[j][i] == gameState[j+2][i+2]
				&& gameState[j][i] == gameState[j+3][i+3]) {
				return gameState[j][i];
			}
		}
	}
	for (let i = 0; i < cols - howMany + 1; i++) {
		for (let j = 0; j < rows - howMany + 1; j++) {
			if (gameState[j+3][i] == 0) {
				continue;
			}
			if (gameState[j+3][i] == gameState[j+2][i+1]
				&& gameState[j+3][i] == gameState[j+1][i+2]
				&& gameState[j+3][i] == gameState[j][i+3]) {
				return gameState[j + 3][i];
			}
		}
	}
	return 0;
}

function getBoxIndex(boxEl) {
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i] == boxEl) {
      return i;
    }
  }
  return -1;
}

function findValidRow(col, row) {
  for (let i = 6 - 1; i >= 0; i--) {
    if (gameState[i][col] == 0) {
      return i;
    }
  }
  return -1;
}

function placeToken(col, row) {
  const validRow = findValidRow(col, row);
  if (validRow < 0) {
    return;
  }
  gameState[validRow][col] = currentPlayer;
  console.log(gameState);
  const box = boxes[7 * validRow + col];
  box.classList.add(`player-${currentPlayer}`);
  const winner = checkWinner();
  if (winner > 0) {
    stop(winner);
    return;
  }
  currentPlayer = 3 - currentPlayer;
  stopTimer();
  setTime(60);
  intervalId = setInterval(countTime, 1000);
}

function handleClick(ev) {
  if (isStopped) {
    return;
  }
  const boxEl = ev.target.closest('.box');
  if (!boxEl) {
    return;
  }
  const boxIndex = getBoxIndex(boxEl);
  const col = boxIndex % 7;
  const row = Math.floor(boxIndex / 7);
  console.log(col, row);
  placeToken(col, row);
  displayCurrentPlayer.textContent = `${currentPlayer} to play`;
}

function secondsToMmSs(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const secondsStr = ("" + seconds).padStart(2, "0");

  return `${minutes}:${secondsStr}`;
}

function stop(winner) {
  let winnerSign = "";
  if (winner == 1) {
    winnerSign = "Player One wins!";
  } else {
    winnerSign = "Player Two wins!";
  }
  
  renderGameStatus(winnerSign);
  isStopped = true;
  stopTimer();
  finalWinner = winner;
}

function setTime(totalSeconds) {
  time = totalSeconds;
  document.querySelector('.time').textContent = secondsToMmSs(time);
}

function countTime() {
  setTime(time - 1);
  if (time <= 0) {
    stop(3 - currentPlayer);
  }
}

function renderGameStatus(gameStatus) {
    document.querySelector('.game-status').textContent = gameStatus;
}

function stopTimer() {
  if (intervalId > -1) {
    clearInterval(intervalId);
    intervalId = -1;
  }
}

intervalId = setInterval(countTime, 1000);

document.querySelector('.quit-game-button').addEventListener('click', () => {
  if (confirm("Are you sure you want to quit?")) {
    location.href = "lobby";
  }
});
