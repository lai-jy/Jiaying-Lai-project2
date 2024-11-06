// pages/Game.js
import React from "react";
import { useParams } from "react-router-dom";
import MinesweeperGame from "../components/MinesweeperGame";

const Game = () => {
  const { difficulty } = useParams();
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* <h1>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode</h1> */}
      <MinesweeperGame difficulty={difficulty} />
    </div>
  );
};

export default Game;
