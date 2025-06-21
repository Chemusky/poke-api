import React, { useState, useEffect } from "react";
import { getAllPokemons } from "../api/pokemonsFetch";
// import styles from "../PokemonList.css";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await getAllPokemons();

        // Obtener detalles de cada Pokémon
        // Promise.all es algo importante
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => await getPokemonDetails(pokemon))
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    loadPokemons();
  }, []);

  // Función para obtener detalles del Pokémon
  const getPokemonDetails = async (pokemon) => {
    const res = await fetch(pokemon.url);
    const details = await res.json();

    const speciesRes = await fetch(details.species.url);
    const speciesData = await speciesRes.json();

    let evolvesFrom = null;
    if (speciesData.evolves_from_species) {
      evolvesFrom = speciesData.evolves_from_species.name;
    }

    return {
      id: details.id,
      name: details.name,
      type: details.types.map((t) => t.type.name).join(", "),
      evolvesFrom,
    };
  };

  return (
    <div>
      <h2>Pokémon List</h2>
      <ul>
        {pokemons.map((pokemon) => {
          let evolvesFromDisplay = null;
          if (pokemon.evolvesFrom) {
            evolvesFromDisplay = (
              <p>
                <strong>Evoluciona de:</strong> {pokemon.evolvesFrom}
              </p>
            );
          }

          return (
            <li key={pokemon.id}>
              <p>ID: {pokemon.id}</p>
              <p>Name: {pokemon.name}</p>
              <p>Type: {pokemon.type}</p>
              {evolvesFromDisplay}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonList;
