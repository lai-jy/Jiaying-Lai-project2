// pages/Rules.js
import React from "react";
import "./Rules.css";

const Rules = () => (
  <div className="rules">
    <h1>Game Rules</h1>
    <p>The goal of Dragonfinder is to uncover all safe cells without waking any dragons.</p>
    <h2>Instructions:</h2>
    <ul>
      <li>Click on a cell to reveal it.</li>
      <li>If a cell has no dragons around it, it will be empty.</li>
      <li>If a cell has dragons nearby, it will show a number indicating the count of dragons in adjacent cells.</li>
      <li>If you click on a cell with a dragon, the game is over.</li>
      <li>Reveal all safe cells to win the game.</li>
    </ul>
  </div>
);

export default Rules;
