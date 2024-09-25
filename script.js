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

function createPlayer(player) {
  this.player = player;
  const getPlayer = () => this.player;
  return { getPlayer };
}

function game(player1, player2, board, turn) {
  let winner = null;

  const updateGame = (player1, player2, board, turn) => {
    const row = 0;
    const col = 0;
    const mark = player1 === turn ? player1 : player2;
    board.setBoard(row, col, mark);

    // Set the winner
  };

  const getWinner = () => winner;

  return { getWinner };
}
