const reset = document.getElementById('reset');
const xplay = document.getElementById('xchoice');
const oplay = document.getElementById('ochoice');
const winText = document.querySelector('.winner>p');
const userScoreElement = document.getElementById('user-score');
const compScoreElement = document.getElementById('comp-score');
const turn = document.getElementById('turn');

var boxes = document.querySelectorAll('.box');
var body = document.querySelector('.game-board');

var user = '';
var comp = '';
var moveCount = 0;
var values = [];
var winner = '';
var winningLine = [];
var userScore = 0;
var compScore = 0;

(function() {
	for (let i = 0; i < 3; i++) {
		winningLine.push([ i * 3, i * 3 + 1, i * 3 + 2 ]);
		winningLine.push([ i, i + 3, i + 6 ]);
	}
	winningLine.push([ 0, 4, 8 ]);

	winningLine.push([ 2, 4, 6 ]);
})();

main();

xplay.addEventListener('click', () => {
	oplay.disabled = true;
	xplay.disabled = true;
	user = 'X';
	comp = 'O';
	initiateGame(user, comp);
	let first = Math.random() < 0.5 ? comp : user;
	if (first == comp) {
		moveCount++;
		setTurn(comp);
		setTimeout(() => {
			let val = findBestMove(values);
			boxes[val].innerHTML = comp;
			values[val] = comp;
			setTurn(user);
		}, 100);
	}
	else {
		setTurn(user);
	}
});

oplay.addEventListener('click', () => {
	xplay.disabled = true;
	oplay.disabled = true;
	comp = 'X';
	user = 'O';
	initiateGame(user, comp);
	let first = Math.random() < 0.5 ? comp : user;
	if (first == comp) {
		moveCount++;
		setTurn(comp);
		setTimeout(() => {
			let val = findBestMove(values);
			boxes[val].innerHTML = comp;
			values[val] = comp;
			setTurn(user);
		}, 100);
	}
	else {
		setTurn(user);
	}
});

reset.addEventListener('click', () => {
	boxes.forEach((box) => {
		box.innerHTML = '';
		box.classList.remove('box-win');
	});
	setTurn('');
	comp = '';
	user = '';
	winText.innerHTML = '';
	xplay.disabled = false;
	oplay.disabled = false;
	moveCount = 0;
	values = [];
	winner = '';
	main();
});

function init() {
	for (let i = 0; i < 9; i++) {
		values.push('');
	}
}

function setTurn(current) {
	if (current == user && current != '') {
		turn.innerHTML = `Turn : user - \'${current}\'`;
	}
	else if (current == comp && current != '') {
		turn.innerHTML = `Turn : computer - \'${current}\'`;
	}
	else {
		turn.innerHTML = 'Turn :';
	}
}

function main() {
	init();

	boxes.forEach((box) => {
		box.addEventListener('click', () => {
			if (box.innerHTML === '' && user != '') {
				moveCount++;
				box.innerHTML = user;
				values[parseInt(box.id)] = user;
				getResults();
				if (winner == '' && moveCount < 9) {
					moveCount++;
					setTurn(comp);
					setTimeout(() => {
						let val = findBestMove(values);
						boxes[val].innerHTML = comp;
						values[val] = comp;
						setTurn(user);

						getResults();
					}, 100);
				}
			}
		});
	});
}

function win(line) {
	line.forEach((val) => {
		boxes.forEach((box) => {
			if (winner != '') {
				if (box.innerHTML === winner && parseInt(box.id) === val) {
					box.classList.add('box-win');
					box.classList.remove('box:hover');
				}
			}
		});
	});
	winText.innerHTML = `${winner} has won`;
	let clone = body.cloneNode(true);

	body.parentNode.replaceChild(clone, body);
	body = clone;
	boxes = document.querySelectorAll('.box');
}

function getResults() {
	if (moveCount == 9 && winner == '') {
		winText.innerHTML = 'The game is a Draw';
		setTurn('');
	}
	winLine = null;
	for (let i = 0; i < winningLine.length; i++) {
		let line = winningLine[i];
		if (values[line[0]] == values[line[1]] && values[line[1]] == values[line[2]] && values[line[0]] != '') {
			winner = values[line[0]];
			winLine = line;
			break;
		}
	}
	if (winner != '') {
		setTurn('');
		if (winner == user) {
			userScoreElement.innerHTML = ++userScore;
		}
		else {
			compScoreElement.innerHTML = ++compScore;
		}
		win(winLine);
	}
}
