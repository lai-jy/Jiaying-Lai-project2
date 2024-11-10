
import React, { useContext, useState } from "react";
import Cell from "./Cell";
import { GameContext } from "../context/GameContext";
import "./Board.css";

const Board = () => {
  const { board, setBoard, gameStatus, setGameStatus, setCellsRevealed, handleGameEnd } = useContext(GameContext);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const relocateBomb = (board, row, col) => {
    const rows = board.length;
    const cols = board[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!board[r][c].isMine && (r !== row || c !== col)) {
          board[r][c].isMine = true;
          board[row][col].isMine = false;
          calculateAdjacentMines(board);
          return;
        }
      }
    }
  };

  const calculateAdjacentMines = (board) => {
    const rows = board.length;
    const cols = board[0].length;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!board[row][col].isMine) {
          let mineCount = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i;
              const newCol = col + j;
              if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                board[newRow][newCol].isMine
              ) {
                mineCount++;
              }
            }
          }
          board[row][col].adjacentMines = mineCount;
        }
      }
    }
  };

  const revealCell = (row, col) => {
    if (gameStatus !== "playing" || board[row][col].isRevealed) return;

    const newBoard = board.map((rowArr) =>
      rowArr.map((cell) => ({ ...cell }))
    );

    // Handle first click logic
    if (isFirstClick) {
      setIsFirstClick(false);
      if (newBoard[row][col].isMine) {
        relocateBomb(newBoard, row, col); // Move mine away if first click is on a mine
      }
      calculateAdjacentMines(newBoard); // Recalculate mine counts after relocation
    }

    // If the cell is a mine (after the first click), the game is lost
    if (newBoard[row][col].isMine) {
      newBoard[row][col].isRevealed = true;
      setBoard(newBoard);
      setGameStatus("lost"); // Set game status to "lost"
      handleGameEnd("lost");
      return;
    }

    // Reveal the cell and check win condition if it's not a mine
    if (newBoard[row][col].adjacentMines === 0) {
      revealEmptyCells(newBoard, row, col); // Recursively reveal empty cells
    } else {
      newBoard[row][col].isRevealed = true;
    }

    setBoard(newBoard); // Update board state with all revealed cells
    setCellsRevealed(true);
  };

  // Recursive function to reveal adjacent empty cells
  const revealEmptyCells = (board, row, col) => {
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return;
    if (board[row][col].isRevealed || board[row][col].isMine) return;

    // Reveal the cell
    board[row][col].isRevealed = true;

    // If the cell has adjacent mines, stop recursion here
    if (board[row][col].adjacentMines > 0) return;

    // Recursively reveal neighboring cells if no adjacent mines
    revealEmptyCells(board, row - 1, col); // up
    revealEmptyCells(board, row + 1, col); // down
    revealEmptyCells(board, row, col - 1); // left
    revealEmptyCells(board, row, col + 1); // right
    revealEmptyCells(board, row - 1, col - 1); // up-left
    revealEmptyCells(board, row - 1, col + 1); // up-right
    revealEmptyCells(board, row + 1, col - 1); // down-left
    revealEmptyCells(board, row + 1, col + 1); // down-right
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} cell={cell} onClick={() => revealCell(rowIndex, colIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
