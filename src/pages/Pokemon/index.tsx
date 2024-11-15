/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Landing from "./Landing";
import { PokemonDetails, PokemonList } from "./type";
import axios from "axios";
import Detail from "./Detail";

const Pokemon = () => {
  const limit = 30;
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [pagination, setPagination] = useState<{
    next: string;
    previous: string;
  }>({
    next: "",
    previous: "",
  });
  const [pokemonsFilter, setPokemonsFilter] = useState<PokemonDetails[]>([]);
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetails>();
  const [pokemonType, setPokemonType] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<string>("");
  const [activeURL, setActiveURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const fetchPokemon = async (item: string) => {
    setLoading(true);
    setError(null);

    try {
      const { status, data } = await axios.get(item);

      if (status === 200) {
        setPagination({
          next: data.next,
          previous: data.previous === null ? "" : data.previous,
        });
        const pokemonData = await Promise.all(
          data?.results.map(async (item: PokemonList) => {
            const detailData = await axios.get(item?.url);
            return detailData.data;
          })
        );
        setPokemons(pokemonData);

        const fetchpokemonNames = () => {
          let allNames: string[] = [];
          allNames = allNames.concat(
            data.results.map((pokemon: { name: string }) => pokemon.name)
          );
          return allNames;
        };

        async function fetchPokemonTypes(
          pokemonName: string
        ): Promise<string[]> {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
          );
          const data: PokemonDetails = await response.json();
          return data.types.map((typeInfo) => typeInfo.type.name); // Extract the type names
        }

        const getAllUniquePokemonTypes = async () => {
          const pokemonNames = fetchpokemonNames();
          const allTypes = (
            await Promise.all(
              pokemonNames.map(async (name) => fetchPokemonTypes(name))
            )
          ).flat(); // Flatten the array of arrays of types

          // Step 3: Remove duplicates by converting to a Set and back to an array
          const uniqueTypes = Array.from(new Set(allTypes));

          return uniqueTypes;
        };

        getAllUniquePokemonTypes().then((types) => {
          setPokemonType(types);
        });
      }
    } catch {
      setError("Failed to fetch Pokémon data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!openDetail && active === "") {
      fetchPokemon(
        (pagination?.previous === "" || active === ""
          ? `https://pokeapi.co/api/v2/pokemon/`
          : activeURL) || ""
      );
    }
  }, [limit, active]);

  const handleDetail = (item: PokemonDetails) => {
    setOpenDetail(true);
    setPokemonDetail(item);
  };

  const handleFilter = (item: string) => {
    const pokemonsFiltering = pokemons.filter((pokemon) =>
      pokemon.types.some((pokemonType) => pokemonType.type.name === item)
    );
    setActive(item);
    setPokemonsFilter(pokemonsFiltering);
  };

  const handleClose = () => {
    setActive("");
  };

  const handleBack = () => {
    setOpenDetail(false);
  };

  const handleNext = (item: string) => {
    setOpenDetail(false);
    setActiveURL(pagination?.next || item);
    fetchPokemon(pagination?.next);
    setActive("");
  };

  const handlePrevious = (item: string) => {
    setOpenDetail(false);
    setActiveURL(pagination?.previous || item);
    if (pagination?.previous !== "") fetchPokemon(pagination?.previous);
    setActive("");
  };

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>error...</div>
      ) : (
        <div>
          {openDetail ? (
            <Detail
              id={pokemonDetail?.id || 0}
              name={pokemonDetail?.name || ""}
              sprites={{
                front_default: pokemonDetail?.sprites?.front_default || "",
              }}
              types={pokemonDetail?.types || []}
              moves={pokemonDetail?.moves || []}
              abilities={pokemonDetail?.abilities || []}
              handleBack={handleBack}
            />
          ) : (
            <Landing
              data={active !== "" ? pokemonsFilter : pokemons}
              handleDetail={handleDetail}
              handleFilter={handleFilter}
              pokemonType={pokemonType}
              handleClose={handleClose}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              activate={pagination?.previous}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Pokemon;
