import React from "react";
import Image from "next/image";

interface Pokemon {
  name: string;
  id: number;
  sprite: string;
  abilities: string[];
  types: string[];
  stats: { name: string; value: number }[];
  moves: string[];
}

interface PokemonPageProps {
  pokemon: Pokemon;
}

const PokemonPage: React.FC<PokemonPageProps> = ({ pokemon }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold capitalize text-gray-800">{pokemon.name}</h1>
        <p className="text-gray-600 text-lg">ID: {pokemon.id}</p>

        <div className="flex justify-center my-4">
          <Image
            src={pokemon.sprite}
            alt={pokemon.name}
            width={150}
            height={150}
            className="rounded-lg"
            unoptimized
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mt-4">Type</h2>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span key={type} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm">
              {type}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mt-4">Abilities</h2>
        <ul className="mt-2 space-y-1">
          {pokemon.abilities.map((ability) => (
            <li key={ability} className="text-gray-600 text-sm">
              {ability}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mt-4">Stats</h2>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {pokemon.stats.map((stat) => (
            <p key={stat.name} className="bg-gray-200 text-gray-800 p-2 rounded-lg text-sm">
              <strong>{stat.name}:</strong> {stat.value}
            </p>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mt-4">Moves</h2>
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {pokemon.moves.slice(0, 10).map((move) => (
            <span key={move} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg text-sm">
              {move}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const data = await res.json();

  const pokemon = {
    name: data.name,
    id: data.id,
    sprite: data.sprites.front_default,
    abilities: data.abilities.map((a: any) => a.ability.name),
    types: data.types.map((t: any) => t.type.name),
    stats: data.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    moves: data.moves.map((m: any) => m.move.name),
  };

  return {
    props: { pokemon },
  };
}

export default PokemonPage;
