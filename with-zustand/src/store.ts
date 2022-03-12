import create from "zustand";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export const usePokemonStore = create<{
  pokemon: Pokemon[];
  filteredPokemon: Pokemon[];
  filter: string;
  setFilter: (filter: string) => void;
  setPokemon: (pokemon: Pokemon[]) => void;
}>((set, get) => ({
  pokemon: [],
  filteredPokemon: [],
  filter: "",
  setFilter: (filter: string) =>
    set(() => ({
      filter,
      filteredPokemon: get().pokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filter.toLowerCase())
      ),
    })),
  setPokemon: (pokemon: Pokemon[]) =>
    set(() => ({ pokemon, filteredPokemon: pokemon })),
}));
