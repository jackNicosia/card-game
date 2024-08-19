import React, { useState, useEffect } from "react";
import Cards from "./Card";
import Scoreboard from "./Scoreboard";
import GameOver from "./GameOver";
import { fetchPokemons } from "./pokemonApi";
import "../styles/GameBoard.css";

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Function to fetch Pokémon data and set cards
  const loadPokemonCards = async () => {
    const pokemonList = await fetchPokemons();
    const pokemonData = pokemonList.map((pokemon) => ({
      id: pokemon.id,
      image: pokemon.sprites.front_default,
      name: pokemon.name,
    }));
    setCards(pokemonData);
  };

  useEffect(() => {
    // Fetch Pokémon when the component mounts
    loadPokemonCards();
  }, []);

  function handleRestart() {
    setGameOver(false);
    setScore(0);
    setClickedCards([]);
    loadPokemonCards();
  }

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      if (score > bestScore) {
        setBestScore(score);
      }
      setGameOver(true);
    } else {
      const newScore = score + 1;
      setClickedCards([...clickedCards, id]);
      setScore(newScore);
      if (newScore === cards.length) {
        alert("You Win!");
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        handleRestart(); // Restart the game upon winning
      } else {
        setCards((prevCards) => shuffleArray(prevCards));
      }
    }
  };

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div className="game-board">
      <Scoreboard currentScore={score} bestScore={bestScore} />
      <div className="cards-container">
        {cards.map((card) => (
          <Cards
            key={card.id}
            image={card.image}
            text={card.name}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      <GameOver
        show={gameOver}
        onRestart={handleRestart}
        message="Game Over! Try Again?"
      />
    </div>
  );
}

export default GameBoard;
