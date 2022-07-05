/*----------- Game State Data ----------*/

const board = [null, 0, null, 1, null, 2, null, 3, 4, null, 5, null, 6, null, 7, null, null, 8, null, 9, null, 10, null, 11, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 12, null, 13, null, 14, null, 15, null, null, 16, null, 17, null, 18, null, 19, 20, null, 21, null, 22, null, 23, null]

/*---------- Cached Variables ----------*/

// parses pieceId's and returns the index of that piece's place on the board
let findPiece = (pieceId) => {
	let parsed = parseInt(pieceId)
	return board.indexOf(parsed)
}

// DOM referenes
const cells = document.querySelectorAll('.boardSquare'),
	gameOverText = document.querySelector('.game-over')
let redsPieces = document.querySelectorAll('p')
let blacksPieces = document.querySelectorAll('span')

// player properties
let turn = true
let redScore = 12
let blackScore = 12
let playerPieces

// selected piece properties
let selectedPiece = {
	pieceId: -1,
	indexOfBoardPiece: -1,
	isKing: false,
	seventhSpace: false,
	ninthSpace: false,
	fourteenthSpace: false,
	eighteenthSpace: false,
	minusSeventhSpace: false,
	minusNinthSpace: false,
	minusFourteenthSpace: false,
	minusEighteenthSpace: false,
}

/*---------- Event Listeners ----------*/

// initialize event listeners on pieces
const givePiecesEventListeners = () => {
	if (turn) {
		for (let i = 0; i < redsPieces.length; i++) {
			redsPieces[i].addEventListener('click', getPlayerPieces)
		}
	} else {
		for (let i = 0; i < blacksPieces.length; i++) {
			blacksPieces[i].addEventListener('click', getPlayerPieces)
		}
	}
}

/*---------- Logic ----------*/

// holds the length of the players piece count
const getPlayerPieces = () => {
	if (turn) {
		playerPieces = redsPieces
	} else {
		playerPieces = blacksPieces
	}
	removeCellOnClick()
	resetBorders()
}

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
const removeCellOnClick = () => {
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeAttribute('onclick')
	}
}

// resets borders to default
const resetBorders = () => {
	for (let i = 0; i < playerPieces.length; i++) {
		playerPieces[i].style.border = 'none'
	}
	resetSelectedPieceProperties()
	getSelectedPiece()
}

// resets selected piece properties
const resetSelectedPieceProperties = () => {
	selectedPiece.pieceId = -1
	selectedPiece.pieceId = -1
	selectedPiece.isKing = false
	selectedPiece.seventhSpace = false
	selectedPiece.ninthSpace = false
	selectedPiece.fourteenthSpace = false
	selectedPiece.eighteenthSpace = false
	selectedPiece.minusSeventhSpace = false
	selectedPiece.minusNinthSpace = false
	selectedPiece.minusFourteenthSpace = false
	selectedPiece.minusEighteenthSpace = false
}

// gets ID and index of the board cell its on
const getSelectedPiece = () => {
	selectedPiece.pieceId = parseInt(event.target.id)
	selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId)
	isPieceKing()
}

// checks if selected piece is a king
const isPieceKing = () => {
	if (document.getElementById(selectedPiece.pieceId).classList.contains('king')) {
		selectedPiece.isKing = true
	} else {
		selectedPiece.isKing = false
	}
	getAvailableSpaces()
}

// gets the moves that the selected piece can make
const getAvailableSpaces = () => {
	if (board[selectedPiece.indexOfBoardPiece + 7] === null && cells[selectedPiece.indexOfBoardPiece + 7].classList.contains('noPieceHere') !== true) {
		selectedPiece.seventhSpace = true
	}
	if (board[selectedPiece.indexOfBoardPiece + 9] === null && cells[selectedPiece.indexOfBoardPiece + 9].classList.contains('noPieceHere') !== true) {
		selectedPiece.ninthSpace = true
	}
	if (board[selectedPiece.indexOfBoardPiece - 7] === null && cells[selectedPiece.indexOfBoardPiece - 7].classList.contains('noPieceHere') !== true) {
		selectedPiece.minusSeventhSpace = true
	}
	if (board[selectedPiece.indexOfBoardPiece - 9] === null && cells[selectedPiece.indexOfBoardPiece - 9].classList.contains('noPieceHere') !== true) {
		selectedPiece.minusNinthSpace = true
	}
	checkAvailableJumpSpaces()
}

// gets the moves that the selected piece can jump
const checkAvailableJumpSpaces = () => {
	if (turn) {
		if (board[selectedPiece.indexOfBoardPiece + 14] === null && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains('noPieceHere') !== true && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
			selectedPiece.fourteenthSpace = true
		}
		if (board[selectedPiece.indexOfBoardPiece + 18] === null && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains('noPieceHere') !== true && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
			selectedPiece.eighteenthSpace = true
		}
		if (board[selectedPiece.indexOfBoardPiece - 14] === null && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains('noPieceHere') !== true && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
			selectedPiece.minusFourteenthSpace = true
		}
		if (board[selectedPiece.indexOfBoardPiece - 18] === null && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains('noPieceHere') !== true && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
			selectedPiece.minusEighteenthSpace = true
		}
	} else {
		if (board[selectedPiece.indexOfBoardPiece + 14] === null && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains('noPieceHere') !== true && board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
			selectedPiece.fourteenthSpace = true
		}
		if (board[selectedPiece.indexOfBoardPiece + 18] === null && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains('noPieceHere') !== true && board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
			selectedPiece.eighteenthSpace = true
		}
		if (board[selectedPiece.indexOfBoardPiece - 14] === null && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains('noPieceHere') !== true && board[selectedPiece.indexOfBoardPiece - 7] < 12 && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
			selectedPiece.minusFourteenthSpace = true
		}
		if (board[selectedPiece.indexOfBoardPiece - 18] === null && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains('noPieceHere') !== true && board[selectedPiece.indexOfBoardPiece - 9] < 12 && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
			selectedPiece.minusEighteenthSpace = true
		}
	}
	checkPieceConditions()
}

// restricts movement if the piece is a king
const checkPieceConditions = () => {
	if (selectedPiece.isKing) {
		givePieceBorder()
	} else {
		if (turn) {
			selectedPiece.minusSeventhSpace = false
			selectedPiece.minusNinthSpace = false
			selectedPiece.minusFourteenthSpace = false
			selectedPiece.minusEighteenthSpace = false
		} else {
			selectedPiece.seventhSpace = false
			selectedPiece.ninthSpace = false
			selectedPiece.fourteenthSpace = false
			selectedPiece.eighteenthSpace = false
		}
		givePieceBorder()
	}
}

// gives the piece a green highlight for the user (showing its movable)
const givePieceBorder = () => {
	if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
		document.getElementById(selectedPiece.pieceId).style.border = '2px solid white'
		giveCellsClick()
	} else {
		return
	}
}

// gives the cells on the board a 'click' bassed on the possible moves
const giveCellsClick = () => {
	if (selectedPiece.seventhSpace) {
		cells[selectedPiece.indexOfBoardPiece + 7].setAttribute('onclick', 'makeMove(7)')
	}
	if (selectedPiece.ninthSpace) {
		cells[selectedPiece.indexOfBoardPiece + 9].setAttribute('onclick', 'makeMove(9)')
	}
	if (selectedPiece.fourteenthSpace) {
		cells[selectedPiece.indexOfBoardPiece + 14].setAttribute('onclick', 'makeMove(14)')
	}
	if (selectedPiece.eighteenthSpace) {
		cells[selectedPiece.indexOfBoardPiece + 18].setAttribute('onclick', 'makeMove(18)')
	}
	if (selectedPiece.minusSeventhSpace) {
		cells[selectedPiece.indexOfBoardPiece - 7].setAttribute('onclick', 'makeMove(-7)')
	}
	if (selectedPiece.minusNinthSpace) {
		cells[selectedPiece.indexOfBoardPiece - 9].setAttribute('onclick', 'makeMove(-9)')
	}
	if (selectedPiece.minusFourteenthSpace) {
		cells[selectedPiece.indexOfBoardPiece - 14].setAttribute('onclick', 'makeMove(-14)')
	}
	if (selectedPiece.minusEighteenthSpace) {
		cells[selectedPiece.indexOfBoardPiece - 18].setAttribute('onclick', 'makeMove(-18)')
	}
}

/* v when the cell is clicked v */

// makes the move that was clicked
const makeMove = (number) => {
	document.getElementById(selectedPiece.pieceId).remove()
	cells[selectedPiece.indexOfBoardPiece].innerHTML = ''
	if (turn) {
		if (selectedPiece.isKing) {
			cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece king" id="${selectedPiece.pieceId}"></p>`
			redsPieces = document.querySelectorAll('p')
		} else {
			cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`
			redsPieces = document.querySelectorAll('p')
		}
	} else {
		if (selectedPiece.isKing) {
			cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece king" id="${selectedPiece.pieceId}"></span>`
			blacksPieces = document.querySelectorAll('span')
		} else {
			cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`
			blacksPieces = document.querySelectorAll('span')
		}
	}

	let indexOfPiece = selectedPiece.indexOfBoardPiece
	if (number === 14 || number === -14 || number === 18 || number === -18) {
		changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2)
	} else {
		changeData(indexOfPiece, indexOfPiece + number)
	}
}

// Changes the board states data on the back end
const changeData = (indexOfBoardPiece, modifiedIndex, removePiece) => {
	board[indexOfBoardPiece] = null
	board[modifiedIndex] = parseInt(selectedPiece.pieceId)
	if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
		document.getElementById(selectedPiece.pieceId).classList.add('king')
	}
	if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
		document.getElementById(selectedPiece.pieceId).classList.add('king')
	}
	if (removePiece) {
		board[removePiece] = null
		if (turn && selectedPiece.pieceId < 12) {
			cells[removePiece].innerHTML = ''
			blackScore--
		}
		if (turn === false && selectedPiece.pieceId >= 12) {
			cells[removePiece].innerHTML = ''
			redScore--
		}
	}
	resetSelectedPieceProperties()
	removeCellOnClick()
	removeEventListeners()
}

// removes the 'onClick' event listeners for pieces
const removeEventListeners = () => {
	if (turn) {
		for (let i = 0; i < redsPieces.length; i++) {
			redsPieces[i].removeEventListener('click', getPlayerPieces)
		}
	} else {
		for (let i = 0; i < blacksPieces.length; i++) {
			blacksPieces[i].removeEventListener('click', getPlayerPieces)
		}
	}
	checkForWin()
}
// Checks for a win
const checkForWin = () => {
	console.log(redScore)
	if (blackScore === 0) {
		gameOverText.innerHTML = '<p>GAME OVER! <br><span style="color: red">RED</span> WINS!</p><button class="reload">Play Again!</button>'
		document.querySelector('.overlay').style.visibility = 'visible'
		document.querySelector('.reload').addEventListener('click', () => {
			window.location.reload(true)
		})
	} else if (redScore === 0) {
		document.querySelector('.overlay').style.visibility = 'visible'
		gameOverText.innerHTML = '<p>GAME OVER! <br><span style="color: black">BLACK</span> WINS!</p><button class="reload">Play Again!</button>'
		document.querySelector('.reload').addEventListener('click', () => {
			window.location.reload(true)
		})
	}

	changeTurns()
}

// Switches players turn
const changeTurns = () => {
	if (turn) {
		turn = false
		document.querySelector('.turn').textContent = 'black turn'
	} else {
		document.querySelector('.turn').textContent = 'red turn'
		turn = true
	}
	givePiecesEventListeners()
}

givePiecesEventListeners()
