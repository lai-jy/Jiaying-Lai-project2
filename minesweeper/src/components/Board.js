// components/Board.js
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
          return board;
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
        relocateBomb(newBoard, row, col);
      }
    }

    // If the cell is a mine, the game is lost
    if (newBoard[row][col].isMine) {
      newBoard[row][col].isRevealed = true;
      setBoard(newBoard);
      setGameStatus("lost"); // Set game status to "lost"
      handleGameEnd("lost");
      return;
    }

    // Reveal the cell and check win condition if it's not a mine
    newBoard[row][col].isRevealed = true;
    setBoard(newBoard);
    setCellsRevealed(true);
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
