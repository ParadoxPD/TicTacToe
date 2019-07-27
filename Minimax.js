var player = 'O';
var opponent = 'X';
var winningLine = [];

(function() {
	for (let i = 0; i < 3; i++) {
		winningLine.push([ i * 3, i * 3 + 1, i * 3 + 2 ]);
		winningLine.push([ i, i + 3, i + 6 ]);
	}
	winningLine.push([ 0, 4, 8 ]);
	winningLine.push([ 2, 4, 6 ]);
})();
//console.log(winningLine);

function initiateGame(user, computer) {
	player = computer;
	opponent = user;
}

function findBestMove(currentBoardState) {
	let bestMove = -1000;
	let pos = -1;
	//console.log(currentBoardState);
	for (let i = 0; i < 9; i++) {
		if (currentBoardState[i] == undefined || currentBoardState[i] == '') {
			currentBoardState[i] = player;

			let val = minimax(currentBoardState, 0, false);
			currentBoardState[i] = '';

			if (val > bestMove) {
				bestMove = val;
				pos = i;
			}
		}
	}
	return pos;
}

function minimax(currentBoardState, depth, isMaximizer) {
	let score = checkVictory(currentBoardState);
	if (score == 10) {
		return score - depth;
	}
	else if (score == -10) {
		return depth + score;
	}
	else if (!isMoveLeft(currentBoardState)) {
		return 0;
	}
	else {
		if (isMaximizer) {
			let bestVal = -1000;
			for (let i = 0; i < 9; i++) {
				if (currentBoardState[i] == '') {
					currentBoardState[i] = player;

					let value = minimax(currentBoardState, depth + 1, !isMaximizer);
					bestVal = Math.max(value, bestVal);
					currentBoardState[i] = '';
				}
			}
			return bestVal;
		}
		else {
			let bestVal = 1000;
			for (let i = 0; i < 9; i++) {
				if (currentBoardState[i] == '') {
					currentBoardState[i] = opponent;

					let value = minimax(currentBoardState, depth + 1, !isMaximizer);
					bestVal = Math.min(value, bestVal);
					currentBoardState[i] = '';
				}
			}
			return bestVal;
		}
	}
}

function checkVictory(currentBoardState) {
	let winner = '';
	for (let i = 0; i < winningLine.length; i++) {
		line = winningLine[i];
		//console.log(currentBoardState[line[0]]);
		//console.log(currentBoardState[line[1]]);
		//console.log(currentBoardState[line[2]]);
		//console.log(line);
		//console.log(i);

		if (
			currentBoardState[line[0]] === currentBoardState[line[1]] &&
			currentBoardState[line[1]] === currentBoardState[line[2]] &&
			currentBoardState[line[0]] != undefined
		) {
			winner = currentBoardState[line[0]];
			break;
		}
	}
	//console.log(winner);
	if (winner == player) {
		return 10;
	}
	else if (winner == opponent) {
		return -10;
	}
	else {
		return 0;
	}
}

function isMoveLeft(currentBoardState) {
	for (let i = 0; i < 9; i++) {
		if (currentBoardState[i] == '') {
			return true;
		}
	}
	return false;
}
