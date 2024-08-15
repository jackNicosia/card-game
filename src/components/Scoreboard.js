import React from "react";
import "../styles/Scoreboard.css";
function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="scoreboard">
      <div className="currentScore">Current Score: {currentScore}</div>
      <div className="bestScore">Best Score: {bestScore}</div>
    </div>
  );
}

export default Scoreboard;
