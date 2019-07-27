const reset = document.getElementById('reset');
const xplay = document.getElementById('xchoice');
const oplay = document.getElementById('ochoice');
const winText = document.querySelector('.winner>p');

var boxes = document.querySelectorAll('.box');
var body = document.querySelector('.game-board');

var player1 = '';
var player2 = '';
var moveCount = 0;
var values = [];
var winner = '';
var winningLine = [];

const get = () => {
	if (moveCount > 3) {
		getResults();
	}
	if (moveCount == 9 && winner === '') {
		winText.innerHTML = 'The game is a Draw';
	}
};

main();

xplay.addEventListener('click', () => {
	oplay.disabled = true;
	player2 = 'X';
	player1 = 'O';

	initiateGame(player2, player1);
	moveCount++;
	let val = findBestMove(values);
	//console.log(val);
	boxes[val].innerHTML = player1;
	values[val] = player1;
});

oplay.addEventListener('click', () => {
	xplay.disabled = true;
	player1 = 'X';
	player2 = 'O';
	initiateGame(player2, player1);
	moveCount++;
	let val = findBestMove(values);
	//console.log(val);
	boxes[val].innerHTML = player1;
	values[val] = player1;
});

reset.addEventListener('click', () => {
	boxes.forEach((box) => {
		box.innerHTML = '';
		box.classList.remove('box-win');
	});
	player1 = '';
	player2 = '';
	winText.innerHTML = '';
	xplay.disabled = false;
	oplay.disabled = false;
	moveCount = 0;
	values = [];
	winner = '';
	winningLine = [];
	main();
});

function init() {
	for (let i = 0; i < 3; i++) {
		winningLine.push([ i * 3, i * 3 + 1, i * 3 + 2 ]);
		winningLine.push([ i, i + 3, i + 6 ]);
	}
	winningLine.push([ 0, 4, 8 ]);

	winningLine.push([ 2, 4, 6 ]);
}

function main() {
	init();
	boxes.forEach((box) => {
		box.addEventListener('click', () => {
			if (box.innerHTML === '' && player2 != '') {
				moveCount++;
				box.innerHTML = player2;
				values[parseInt(box.id)] = player2;
				console.log(values);
				let val = findBestMove(values);
				boxes[val].innerHTML = player1;
				values[val] = player1;

				getResults();
			}
		});
	});

	addEventListener('click', get);
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

	removeEventListener('click', get);
}

function getResults() {
	winLine = null;
	for (let i = 0; i < winningLine.length; i++) {
		let line = winningLine[i];
		if (values[line[0]] == values[line[1]] && values[line[1]] == values[line[2]] && values[line[0]] != undefined) {
			winner = values[line[0]];
			winLine = line;
			break;
		}
	}
	if (winner != '') {
		win(winLine);
	}
}
