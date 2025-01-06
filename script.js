const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Function to handle cell clicks
function handleCellClick(e) {
  const cellIndex = e.target.getAttribute("data-cell");

  // Ignore if the cell is already taken or the game is over
  if (gameBoard[cellIndex] !== "" || statusDiv.textContent !== "") {
    return;
  }

  // Update the cell with the current player's symbol
  gameBoard[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  // Check for a winner
  if (checkWinner()) {
    statusDiv.textContent = `${currentPlayer} Wins!`;
  } else if (gameBoard.every((cell) => cell !== "")) {
    statusDiv.textContent = "It's a Draw!";
  } else {
    // Change to the next player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Function to check for a winner
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

// Function to reset the game
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach((cell) => (cell.textContent = ""));
  statusDiv.textContent = "";
}

// Attach event listeners to each cell
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

// Attach event listener to the reset button
resetBtn.addEventListener("click", resetGame);
