import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Pokemon {
  name: string;
  url: string;
  id: number;
}

interface HomeProps {
  pokemons: Pokemon[];
}

const Home: React.FC<HomeProps> = ({ pokemons }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Pokémon Explorer</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

   
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`} className="block">
              <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-transform">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  className="mx-auto"
                  unoptimized
                />
                <p className="mt-2 text-lg capitalize text-gray-700">{pokemon.name}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-lg col-span-full">No Pokémon found.</p>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const pokemons = data.results.map((pokemon: any, index: number) => ({
    name: pokemon.name,
    url: pokemon.url,
    id: index + 1, 
  }));

  return {
    props: { pokemons }, 
  };
}

export default Home;
