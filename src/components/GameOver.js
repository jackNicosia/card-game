import React from "react";
import "../styles/GameOver.css";

function GameOver({ show, onRestart, message }) {
  if (!show) return null;

  const handleRestart = () => {
    const sound = new Audio(
      `${process.env.PUBLIC_URL}/assets/sounds/restart-sound.mp3`
    );
    sound.play();

    onRestart();
  };

  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h2>{message}</h2>
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    </div>
  );
}

export default GameOver;
