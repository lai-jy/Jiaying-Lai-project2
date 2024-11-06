// components/Cell.js
import React from "react";
import "./Cell.css";

const Cell = ({ cell, onClick }) => {
  let cellContent = "";

  if (cell.isRevealed) {
    if (cell.isMine) {
      cellContent = "💣"; // Display bomb icon if this is a mine
    } else if (cell.adjacentMines > 0) {
      cellContent = cell.adjacentMines; // Show number of adjacent mines
    } else {
      cellContent = ""; // Show empty content for cells with no adjacent mines
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
