import axios from "axios";

// Helper function to get a random number within a range
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const preselectedPokemonIds = [
  1, 4, 7, 25, 39, 63, 151, 150, 133, 147, 173, 175, 200, 213, 214, 240, 243,
  244, 245, 246, 247, 248, 249, 250, 2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  36, 37, 38, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57, 58, 59, 60, 61, 62, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
  76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94,
  95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,

  // Add more IDs as needed
];

export const fetchPokemons = async () => {
  try {
    let selectedIds;

    selectedIds = preselectedPokemonIds
      .sort(() => 0.5 - Math.random()) // Shuffle the array
      .slice(0, 24); // Take the first 24 elements

    const promises = selectedIds.map((id) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).catch(() => null)
    );

    const responses = await Promise.all(promises);

    // Filter out null responses
    return responses
      .filter((response) => response !== null)
      .map((response) => response.data);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};
