// MinesweeperGame.js
import React, { useContext } from "react";
import { GameProvider, GameContext } from "../context/GameContext"
import Board from "./Board";

const MinesweeperGame = ({ difficulty }) => {
  return (
    <GameProvider difficulty={difficulty}>
      <GameContent />
    </GameProvider>
  );
};

const GameContent = () => {
  const { gameStatus, initializeBoard } = useContext(GameContext);

  return (
    <div>
      <button onClick={initializeBoard} style={{ marginBottom: "10px" }}>
        Reset Game
      </button>

      <h1>
        {gameStatus === "won"
          ? "Game over! You Won!"
          : gameStatus === "lost"
          ? "Game over! You lost!"
          : "Minesweeper"}
      </h1>

      <Board />
    </div>
  );
};

export default MinesweeperGame;
