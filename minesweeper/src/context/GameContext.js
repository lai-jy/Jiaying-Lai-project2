// context/GameContext.js
import React, { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children, difficulty }) => {
  const difficultySettings = {
    easy: { rows: 8, cols: 8, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 },
  };

  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const [cellsRevealed, setCellsRevealed] = useState(false);

  const initializeBoard = () => {
    const { rows, cols, mines } = difficultySettings[difficulty];
    const newBoard = createBoard(rows, cols, mines);
    setBoard(newBoard);
    setGameStatus("playing");
    setCellsRevealed(false);
  };

  useEffect(() => {
    initializeBoard();
  }, [difficulty]);

  const createBoard = (rows, cols, mines) => {
    const board = Array(rows)
      .fill()
      .map(() =>
        Array(cols).fill({
          isMine: false,
          adjacentMines: 0,
          isRevealed: false,
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
  };

  const handleGameEnd = (status) => {
    setGameStatus(status);
  };

  const checkWinCondition = () => {
    if (!cellsRevealed || gameStatus !== "playing") return;

    const allSafeRevealed = board.every((row) =>
      row.every((cell) => cell.isRevealed || cell.isMine)
    );
    if (allSafeRevealed) {
      setGameStatus("won");
    }
  };

  useEffect(() => {
    checkWinCondition();
  }, [board]);

  const value = {
    board,
    setBoard,
    gameStatus,
    setGameStatus,
    cellsRevealed,
    setCellsRevealed,
    initializeBoard,
    handleGameEnd,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
