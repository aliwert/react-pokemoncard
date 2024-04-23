import React, { useState, useEffect } from "react";
import "../index.css";
import { MdCatchingPokemon } from "react-icons/md";

const TypeColor = {
    bug: "#5C9900",
    dragon: "#9932CC",
    electric: "#FFD700",
    fairy: "#FF1493",
    fighting: "#8B0000",
    fire: "#FF4500",
    flying: "#87CEEB",
    grass: "#006400",
    ground: "#CD853F",
    ghost: "#4B0082",
    ice: "#00FFFF",
    normal: "#A9A9A9",
    poison: "#800080",
    psychic: "#FF1493",
    rock: "#696969",
    water: "#0000FF",
};

const GeneratorCard = () => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    getPokeData();
  }, []);

  const getPokeData = () => {
    const id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(finalUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const styleCard = (color) => {
    const card = document.getElementById("pokemon-card");
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
  };

  useEffect(() => {
    if (pokemonData) {
      const themeColor = TypeColor[pokemonData.types[0].type.name];
      styleCard(themeColor);
    }
  }, [pokemonData]);

  const generateCard = () => {
    if (!pokemonData) return null;

    const hp = pokemonData.stats[0].base_stat;
    const imgSrc = pokemonData.sprites.other.dream_world.front_default;
    const pokeName =
      pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1);
    const statAttack = pokemonData.stats[1].base_stat;
    const statDefense = pokemonData.stats[2].base_stat;
    const statSpeed = pokemonData.stats[5].base_stat;

    return (
      <div id="pokemon-card">
        <p className="hp">
          <span>HP</span>
          {hp}
        </p>
        <img src={imgSrc} alt={pokeName} />
        <h2 className="poke-name">{pokeName}</h2>
        <div className="types">
          {pokemonData.types.map((type, index) => (
            <span key={index}>{type.type.name}</span>
          ))}
        </div>
        <div className="stats">
          <div>
            <h3>{statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>{statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>{statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {generateCard()}
      <button id="generate-btn" onClick={getPokeData}>
        Generate <span className="icon"><MdCatchingPokemon /></span>
      </button>
    </div>
  );
};

export default GeneratorCard;
