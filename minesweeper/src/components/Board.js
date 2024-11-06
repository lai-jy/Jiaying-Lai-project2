// components/Board.js
import React, { useContext } from "react";
import Cell from "./Cell";
import { GameContext } from "../context/GameContext";
import "./Board.css";

const Board = () => {
  const { board, setBoard, gameStatus, setCellsRevealed, handleGameEnd } = useContext(GameContext);

  const revealCell = (row, col) => {
    if (gameStatus !== "playing" || board[row][col].isRevealed) return;

    const newBoard = board.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? { ...cell, isRevealed: true } : cell
      )
    );

    const cell = newBoard[row][col];
    if (cell.isMine) {
      handleGameEnd("lost");
    } else {
      setCellsRevealed(true);
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
