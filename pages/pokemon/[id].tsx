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
    <div className="p-6 min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
      <Image src={pokemon.sprite} alt={pokemon.name} width={150} height={150} unoptimized />
      <p className="text-lg mt-2">ID: {pokemon.id}</p>

      {/* Pokémon Type */}
      <h2 className="text-2xl font-semibold mt-4">Type</h2>
      <div className="flex justify-center gap-2">
        {pokemon?.types?.map((type) => (
          <span key={type} className="bg-blue-500 text-white px-3 py-1 rounded">
            {type}
          </span>
        ))}
      </div>

      {/* Pokémon Abilities */}
      <h2 className="text-2xl font-semibold mt-4">Abilities</h2>
      <ul className="list-disc list-inside">
        {pokemon?.abilities?.map((ability) => (
          <li key={ability}>{ability}</li>
        ))}
      </ul>

      {/* Pokémon Stats */}
      <h2 className="text-2xl font-semibold mt-4">Stats</h2>
      <div className="grid grid-cols-2 gap-2">
        {pokemon?.stats?.map((stat) => (
          <p key={stat.name} className="bg-gray-200 p-2 rounded">
            <strong>{stat.name}:</strong> {stat.value}
          </p>
        ))}
      </div>

      {/* Pokémon Moves */}
      <h2 className="text-2xl font-semibold mt-4">Moves</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {pokemon?.moves?.slice(0, 10)?.map((move) => ( // Limit to 10 moves for better UI
          <span key={move} className="bg-green-500 text-white px-3 py-1 rounded">
            {move}
          </span>
        ))}
      </div>
    </div>
  );
};

// **Fetch Pokémon details from API using SSR**
export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const data = await res.json();
// console.log(data)
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
