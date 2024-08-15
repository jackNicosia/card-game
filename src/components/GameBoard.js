import React, { useState, useEffect } from "react";
import Cards from "./Card";
import Scoreboard from "./Scoreboard";
import { fetchPokemons } from "./pokemonApi";
import "../styles/GameBoard.css";

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

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

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      alert("Game Over! You already clicked that card!");
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedCards([]);
      loadPokemonCards(); // Fetch new Pokémon data on game over
    } else {
      const newScore = score + 1;
      setClickedCards([...clickedCards, id]);
      setScore(newScore);
      if (newScore === cards.length) {
        alert("You Win!");
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        setClickedCards([]);
        setScore(0);
        loadPokemonCards(); // Fetch new Pokémon data on win
      } else {
        setCards((prevCards) => shuffleArray(prevCards));
        console.log(`Card ${id} clicked!`);
        console.log(clickedCards);
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
    </div>
  );
}

export default GameBoard;
