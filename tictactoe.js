const readline = require('readline');

//Initial game state
let currentPlayer = 'X';
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

//Print board function.
function printBoard() {
    console.log('---------');
    for (let i = 0; i < board.length; i++) {
        console.log(`| ${board[i].join(' | ')} |`);
        console.log('---------');
    }
}

//getting the user input
function getInput(question, callback) {
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

    rl.question(question, (input) => {
        rl.close();
        callback(input);
    });
}

/* This function will iterate all the rows and columns, 
if there are remaining blank values(there are no either 'X' or 'O' values)
then it will return false(the board is not yet full)
or all grids or cells have either 'X' or 'O' values then will return true indicating all cells have already values.
*/
function checkIfFull() {
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] === ' '){
                return false
            }
        }
    }
    return true
}

//check the winner || check if board is full
function checkWinner() {
  
    for (let row = 0; row < board.length; row++) {
      if (
        board[row][0] === currentPlayer &&
        board[row][1] === currentPlayer &&
        board[row][2] === currentPlayer
      ) {
        console.log(`Player ${currentPlayer} wins!`);
        process.exit(0);
      }
    }

    for (let col = 0; col < board[0].length; col++) {
      if (
        board[0][col] === currentPlayer &&
        board[1][col] === currentPlayer &&
        board[2][col] === currentPlayer
      ) {
        console.log(`Player ${currentPlayer} wins!`);
        process.exit(0);
      }
    }

    if (
      (board[0][0] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][2] === currentPlayer) ||
      (board[0][2] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][0] === currentPlayer)
    ) {
      console.log(`Player ${currentPlayer} wins!`);
      process.exit(0);
    }
  
    if (checkIfFull()) {
      console.log("It's a tie!");
      process.exit(0);
    }
  }
  
/**
The function accepts 1 argument(the position of the player's move)
*/
function makeYourMove(pos) {
    let row = Math.floor(pos / 3);
    let col = pos % 3
    if (row >= 0 && row < board.length && col >= 0 && col < board[row].length && board[row][col] === ' ') {
    board[row][col] = currentPlayer;
    printBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  } 
    else {
        console.log('Invalid move. Please try again.');
    }
}

//Getting the user input.
function playTurn() {
  getInput(`Player ${currentPlayer}, please enter your move(0-8): `, (pos) => {
    makeYourMove(parseInt(pos))
    playTurn();
  });
}

console.log('Hi players, let\'s have some fun');

//invoke printBoard and playTurn function.
printBoard();
playTurn();
