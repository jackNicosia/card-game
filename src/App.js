// src/App.js
import React from "react";
import GameBoard from "./components/GameBoard"; // Importing GameBoard component
import Header from "./components/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <GameBoard />
    </div>
  );
};

export default App;
