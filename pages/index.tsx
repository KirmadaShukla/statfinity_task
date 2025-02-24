import React from "react";
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
  return (
    <div className="p-6 min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-4">Pokémon Explorer</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
            <div className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                width={100}
                height={100}
                unoptimized
              />
              <p className="mt-2 text-lg capitalize">{pokemon.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// **Server-side rendering**
export async function getServerSideProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const pokemons = data.results.map((pokemon: any, index: number) => ({
    name: pokemon.name,
    url: pokemon.url,
    id: index + 1, // Pokémon IDs start from 1
  }));

  return {
    props: { pokemons }, // Pass data to the page component
  };
}

export default Home;
