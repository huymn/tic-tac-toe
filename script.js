const newGameButton = document.querySelector(".new-game-button");
const boardDiv = document.querySelector(".board");
const infoDiv = document.querySelector(".info");
const cells = document.querySelectorAll(".cell");

function createPlayer(mark) {
  const getMark = () => mark;
  return { getMark };
}

function createGame() {
  let winner = { player: null, cells: [], message: "" };

  const board = (function Gameboard() {
    let board = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];
    const getBoard = () => board;
    const setBoard = (row, col, mark) => {
      if (row < 3 && row >= 0 && col < 3 && col >= 0) board[row][col] = mark;
    };
    return { getBoard, setBoard };
  })();

  const player1 = createPlayer("X");
  const player2 = createPlayer("O");

  let currentPlayerTurn = player1;

  infoDiv.innerText = `It's ${currentPlayerTurn.getMark()} turn to play.`;

  const updateGame = (cell) => {
    const cellId = cell.id;
    const row = cellId.charAt(0);
    const col = cellId.charAt(1);

    if (board.getBoard()[row][col] === "." && winner.player === null) {
      const mark =
        player1 === currentPlayerTurn ? player1.getMark() : player2.getMark();

      board.setBoard(row, col, mark);

      cell.innerText = mark;

      checkWinner(mark);

      if (winner.player !== null) {
        for (let i = 0; i < winner.cells.length; i++) {
          const winningCell = document.getElementById(winner.cells[i]);
          winningCell.style.backgroundColor = "green";
        }
        infoDiv.innerText = winner.message;
      } else {
        currentPlayerTurn = player1 === currentPlayerTurn ? player2 : player1;
        infoDiv.innerText = `It's ${currentPlayerTurn.getMark()} turn to play.`;
      }
    }
  };

  function checkWinner(mark) {
    const winningMark = `${mark}${mark}${mark}`;

    // Check all rows and update winner object is there's a winner
    for (let i = 0; i < 3; i++) {
      let currRowMark = "";
      let rows = [];
      for (let j = 0; j < 3; j++) {
        currRowMark += board.getBoard()[i][j];
        rows = [...rows, [`${i}${j}`]];
      }
      if (currRowMark === winningMark) {
        winner.player = currentPlayerTurn;
        winner.cells = rows;
        winner.message = `${currentPlayerTurn.getName()} is the winner!`;
      }
    }

    if (winner.player === null) {
      // Check all columns and update winner object if there's a winner
      for (let i = 0; i < 3; i++) {
        let currColMark = "";
        let cols = [];
        for (let j = 0; j < 3; j++) {
          currColMark += board.getBoard()[j][i];
          cols = [...cols, [`${i}${j}`]];
        }
        if (currColMark === winningMark) {
          winner.player = currentPlayerTurn;
          winner.cells = cols;
          winner.message = `${currentPlayerTurn.getName()} is the winner!`;
        }
      }
    }

    if (winner.player === null) {
      // Check the two diagonals
      if (
        board.getBoard()[0][0] +
          board.getBoard()[1][1] +
          board.getBoard()[2][2] ===
        winningMark
      ) {
        winner.player = currentPlayerTurn;
        winner.cells = ["00", "11", "22"];
        winner.message = `${currentPlayerTurn.getMark()} is the winner!`;
      }

      if (
        board.getBoard()[0][2] +
          board.getBoard()[1][1] +
          board.getBoard()[2][0] ===
        winningMark
      ) {
        winner.player = currentPlayerTurn;
        winner.cells = ["02", "11", "20"];
        winner.message = `${currentPlayerTurn.getMark()} is the winner!`;
      }
    }

    if (winner.player === null) {
      let isTie = true;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board.getBoard()[i][j] === ".") {
            isTie = false;
          }
        }
      }

      if (isTie) {
        winner.player = "tie";
        winner.message = "Tie game!";
      }
    }
  }

  const getWinner = () => winner;

  return { getWinner, updateGame };
}

let game = createGame();

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    game.updateGame(cell);
  });
});

newGameButton.addEventListener("click", () => {
  infoDiv.innerText = null;

  cells.forEach((cell) => {
    cell.innerText = "";
  });

  game = createGame();
});
