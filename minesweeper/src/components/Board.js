// components/Board.js
import React, { useContext } from "react";
import Cell from "./Cell";
import { GameContext } from "../context/GameContext";
import "./Board.css";

const Board = () => {
  const { board, setBoard, gameStatus, setGameStatus } = useContext(GameContext);

  const revealEmptyCells = (board, row, col, visited) => {
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || visited[row][col] || board[row][col].isRevealed) {
      return;
    }

    visited[row][col] = true;
    board[row][col].isRevealed = true;

    if (board[row][col].adjacentMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i !== 0 || j !== 0) {
            revealEmptyCells(board, row + i, col + j, visited);
          }
        }
      }
    }
  };

  const revealCell = (row, col) => {
    if (gameStatus !== "playing" || board[row][col].isRevealed) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (newBoard[row][col].isMine) {
      setGameStatus("lost");
      newBoard[row][col].isRevealed = true; // Reveal the bomb
    } else {
      const visited = Array(newBoard.length)
        .fill()
        .map(() => Array(newBoard[0].length).fill(false));
      revealEmptyCells(newBoard, row, col, visited);
    }

    setBoard(newBoard);
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
