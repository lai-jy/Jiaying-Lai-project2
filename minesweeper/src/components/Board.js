// Board.js
import React from "react";
import Cell from "./Cell";
import "./Board.css";

const Board = ({ board, setBoard, onGameEnd, gameStatus, setCellsRevealed }) => {
  const revealCell = (row, col) => {
    if (gameStatus !== "playing") return;

    const newBoard = board.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? { ...cell, isRevealed: true } : cell
      )
    );

    const cell = newBoard[row][col];
    if (cell.isMine) {
      onGameEnd("lost");
    } else {
      setCellsRevealed(true); // Indicate that at least one cell has been revealed
    }
    setBoard(newBoard);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              cell={cell}
              onClick={() => revealCell(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
