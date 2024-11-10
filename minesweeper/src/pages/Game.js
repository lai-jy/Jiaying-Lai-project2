
import React from "react";
import { useParams } from "react-router-dom";
import MinesweeperGame from "../components/MinesweeperGame";

const Game = () => {
  const { difficulty } = useParams();
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <MinesweeperGame difficulty={difficulty} />
    </div>
  );
};

export default Game;
