import React from "react";
import "../styles/GameOver.css";

function GameOver({ show, onRestart, message }) {
  if (!show) return null;

  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h2>{message}</h2>
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
}

export default GameOver;
