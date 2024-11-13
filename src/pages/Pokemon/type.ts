export interface PokemonType {
  name: string;
}

export interface PokemonAbility {
  name: string;
}

export interface PokemonData {
  id: number;
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  height: number;
  weight: number;
  imageUrl: string;
}

export interface ApiResponse {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
  sprites: { front_default: string };
}
