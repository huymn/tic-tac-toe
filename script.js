const newGameButton = document.querySelector(".new-game-button");
const boardDiv = document.querySelector(".board");
const resultDiv = document.querySelector(".result");

function createPlayer(mark, name) {
  const getMark = () => mark;
  const getName = () => name;
  return { getMark, getName };
}

function createGame(player1Name, player2Name, board) {
  let winner = { player: null, cells: [], message: "" };

  const player1 = createPlayer("X", player1Name);
  const player2 = createPlayer("O", player2Name);

  let currentPlayerTurn = player1;

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
          // const winningCell = document.querySelector("#" + winner.cells[i]);
          // winningCell.computedStyleMap.backgroundColor = "green";
        }
        resultDiv.innerText = winner.message;
      } else {
        currentPlayerTurn = player1 === currentPlayerTurn ? player2 : player1;
      }
    }
  };

  function checkWinner(mark) {
    // Check for tie
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
    } else {
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

      // Check the two diagonals
      if (
        board.getBoard()[0][0] +
          board.getBoard()[1][1] +
          board.getBoard()[2][2] ===
        winningMark
      ) {
        winner.player = currentPlayerTurn;
        winner.cells = ["00", "11", "22"];
        winner.message = `${currentPlayerTurn.getName()} is the winner!`;
      }

      if (
        board.getBoard()[0][2] +
          board.getBoard()[1][1] +
          board.getBoard()[2][0] ===
        winningMark
      ) {
        winner.player = currentPlayerTurn;
        winner.cells = ["02", "11", "20"];
        winner.message = `${currentPlayerTurn.getName()} is the winner!`;
      }
    }
  }

  const getWinner = () => winner;

  return { getWinner, updateGame };
}

newGameButton.addEventListener("click", () => {
  resultDiv.innerText = null;
  boardDiv.replaceChildren();
  //Draw new board
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const newCell = document.createElement("div");
      newCell.id = `${i}${j}`;
      newCell.classList.add("cell");
      boardDiv.appendChild(newCell);
    }
  }

  const gameBoard = (function Gameboard() {
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

  const game = createGame("player1", "player2", gameBoard);

  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      game.updateGame(cell);
    });
  });
});
