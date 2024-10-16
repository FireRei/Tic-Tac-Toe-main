const gameboard = (() => {
	let board = ["", "", "", "", "", "", "", "", ""]
	let turn = 1;
	const changeTurn = () => {
		turn++;
	}
	const getTurn = () => {
		return turn;
	}
	const editBoard = (id, mark) => {
		board.splice(id, 1, mark);
	}
	const getBoard = () => {
		return board;
	}
	const clearBoard = () => {
		board = ["", "", "", "", "", "", "", "", ""]
	}
	const turnReset = () => {
		turn = 1;
	}
	return { board, changeTurn, getTurn, editBoard, getBoard, clearBoard, turnReset };
})()

function Players(playerName, mark) { 
	let win = 0;
	let name = playerName;
	const roundOver = () => {
		win += 1;
	}
	const getScore = () => {
		return win;
	}
	const changeName = (newName) => {
		name = newName
	}
	const getName = () => {
		return name;
	}
	return { name, mark, roundOver, getScore, changeName, getName }
}




const game = (() => {
	const boxes = document.querySelectorAll(".board")
	let mark
	let id = 0;
	let matchOver = false;
	const init = () => {
		boxes.forEach((box) => {
			box.id = "box" + id.toString();
			id++;
			box.addEventListener('click', e => {
				click(e) 		
			})
		})
	}

	const reset = () => {
		mark = "";
		id = 0;
		matchOver = false;
		gameboard.clearBoard();
		gameboard.turnReset();
		boxes.forEach((box) => {
			box.textContent = "";
			box.classList.remove("played");
		})
	}
	const computer = () => {
		rng = Math.floor(Math.random() * 9)
		console.log(rng);
		computerPlay = document.querySelector("#box" + rng.toString());
		console.log(computerPlay)	
		if (computerPlay.classList.contains("played")) {
			computer();
		} else {
			boxPlay(computerPlay, player2)
		}
	}
	

	const click = (e) => {
		if (matchOver != true) {
			let box = e.target;
			console.log(!box.classList.contains(player1.mark) || !box.classList.contains(player2.mark))
			if (!box.classList.contains("played")) { 
				((gameboard.getTurn() % 2) != 0) ? player = player1 : player = player2;
				boxPlay(box, player);
				if ((gameboard.getTurn() % 2) == 0 && !matchOver) computer();
			}
		}
	}
	const boxPlay = (box, player) => {
		mark = player.mark;
		box.textContent = mark;
		box.classList.add("played");
		gameboard.editBoard(box.id.replace("box", ""), mark);
		checkWin(gameboard.getBoard(), player);
		gameboard.changeTurn();
	}
	const checkWin = (arr, player) => {
		let winConditions = [
			arr.slice(0, 3),
			arr.slice(3, 6),
			arr.slice(6, 9),
			[arr[0], arr[3], arr[6]],
			[arr[1], arr[4], arr[7]],
			[arr[2], arr[5], arr[8]],
			[arr[0], arr[4], arr[8]],
			[arr[2], arr[4], arr[6]]
		  ]
		for (let i = 0; i < winConditions.length; i++) {
			if (winConditions[i].toString() == "X,X,X" || winConditions[i].toString() == "O,O,O") {
				matchOver = true;
				console.log(player.getName() + " wins!");
				player.roundOver();
				console.log(player.getScore());
			}
			else if (gameboard.getTurn() == 9) {
				matchOver = true;
				console.log("Tie!");
			}
		}
	}
	return { init, reset }
})()

const player1 = Players("Player", "X");
const player2 = Players("Computer", "O");

const form = document.querySelector('form')
form.addEventListener('submit', e => {
	console.log("test")
	e.preventDefault();
	let nameField = document.querySelector('input')
	let name = nameField.value;
	if (player1) {
		player1.changeName(name);
		console.log(player1.getName())
	}
})

const reset = document.querySelector('.reset')
reset.addEventListener('click', e => {
	if (reset.textContent == "Start") {
		game.init();
		reset.textContent = "Reset"
	} else {
		game.reset();
		reset.textContent = "Start";
	}
})





