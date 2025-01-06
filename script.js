const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];


function handleCellClick(e) {
  const cellIndex = e.target.getAttribute("data-cell");

  if (gameBoard[cellIndex] !== "" || statusDiv.textContent !== "") {
    return;
  }

  gameBoard[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusDiv.textContent = `${currentPlayer} Wins!`;
  } else if (gameBoard.every((cell) => cell !== "")) {
    statusDiv.textContent = "It's a Draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}


function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    );
  });
}


function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach((cell) => (cell.textContent = ""));
  statusDiv.textContent = "";
}


cells.forEach((cell) => cell.addEventListener("click", handleCellClick));


resetBtn.addEventListener("click", resetGame);
