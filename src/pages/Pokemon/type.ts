export interface PokemonType {
  id: number;
  name: string;
  abilities: PokemonAbility[];
  height: number;
  weight: number;
  imageUrl: string;
}

export interface PokemonList {
  name: string;
  url: string;
}

export interface PokemonMoves {
  effect_entries: { effect: string };
  power: number;
  name: string;
  accuracy: string;
  move: { short_effect: string; effect: string };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonList {
  name: string;
  url: string;
}

export interface PokemonData {
  count: number;
  next: string;
  previous: string;
  results: PokemonList[];
  pokemonType: PokemonList[];
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  name: string;
  effect_entries: { effect: string };
  power: number;
  accuracy: number;
  pp: number;
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  name: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  moves: PokemonMove[];
  abilities: PokemonAbility[];
  handleBack: () => void;
}

export interface PropsLanding {
  data: PokemonDetails[];
  handleDetail: (item: PokemonDetails) => void;
  handleFilter: (item: string) => void;
  handleClose: () => void;
  handleNext: (item: string) => void;
  handlePrevious: (item: string) => void;
  pokemonType: string[];
  activate: string;
}

export interface APIResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonList[];
}
