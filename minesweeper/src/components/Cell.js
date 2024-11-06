// components/Cell.js
import React from "react";
import "./Cell.css";

const Cell = ({ cell, onClick }) => {
  let cellContent = "";

  if (cell.isRevealed) {
    if (cell.isMine) {
      cellContent = "💣";
    } else if (cell.adjacentMines > 0) {
      cellContent = cell.adjacentMines;
    } else {
      cellContent = "";
    }
  }

  return (
    <div
      className={`cell ${cell.isRevealed ? (cell.isMine ? "cell-bomb" : "cell-safe") : "cell-unselected"}`}
      onClick={onClick}
    >
      {cellContent}
    </div>
  );
};

export default Cell;
