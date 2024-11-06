// MinesweeperGame.js
import React, { useState, useEffect } from "react";
import Board from "./Board";

const difficultySettings = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 },
};

// Function to create the Minesweeper board with mines
function createBoard(rows, cols, mines) {
  const board = Array(rows).fill().map(() =>
    Array(cols).fill({
      isMine: false,
      adjacentMines: 0,
      isRevealed: false, // Ensure all cells start unrevealed
    })
  );

  let placedMines = 0;
  while (placedMines < mines) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);
    if (!board[randomRow][randomCol].isMine) {
      board[randomRow][randomCol] = { ...board[randomRow][randomCol], isMine: true };
      placedMines++;
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isMine) {
        let mineCount = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol].isMine) {
              mineCount++;
            }
          }
        }
        board[row][col] = { ...board[row][col], adjacentMines: mineCount };
      }
    }
  }
  return board;
}

const MinesweeperGame = ({ difficulty }) => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const [cellsRevealed, setCellsRevealed] = useState(false); // Track if any cell has been revealed

  const initializeBoard = () => {
    const { rows, cols, mines } = difficultySettings[difficulty];
    const newBoard = createBoard(rows, cols, mines);
    setBoard(newBoard);
    setGameStatus("playing");
    setCellsRevealed(false); // Reset cellsRevealed when the game starts
  };

  useEffect(() => {
    initializeBoard();
  }, [difficulty]);

  const handleReset = () => {
    initializeBoard();
  };

  const handleGameEnd = (status) => {
    setGameStatus(status);
  };

  const checkWinCondition = () => {
    if (!cellsRevealed || gameStatus !== "playing") return; // Only check if a cell has been revealed

    // Check if all safe cells are revealed
    const allSafeRevealed = board.every(row => 
      row.every(cell => cell.isRevealed || cell.isMine)
    );
    if (allSafeRevealed) {
      setGameStatus("won");
    }
  };

  useEffect(() => {
    checkWinCondition();
  }, [board]);

  return (
    <div>
      <button onClick={handleReset} style={{ marginBottom: "10px" }}>Reset Game</button>
      
      <h1>
        {gameStatus === "won" ? "Game over! You Won!" : gameStatus === "lost" ? "Game over! You lost!" : `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode`}
      </h1>
      
      <Board board={board} setBoard={setBoard} onGameEnd={handleGameEnd} gameStatus={gameStatus} setCellsRevealed={setCellsRevealed} />
    </div>
  );
};

export default MinesweeperGame;
