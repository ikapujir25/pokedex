/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Landing from "./Landing";
import { PokemonDetails, PokemonList } from "./type";
import axios from "axios";
import Detail from "./Detail";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemonType, setPokemonType] = useState([]);
  const limit = 30;
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  useEffect(() => {
    if (!openDetail) {
      const fetchPokemon = async () => {
        setLoading(true);
        setError(null);

        try {
          const { status, data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/`
          );

          if (status === 200) {
            console.warn(data?.results, "data?.results");
            const pokemonData = await Promise.all(
              data?.results.map(async (item: PokemonList) => {
                const detailData = await axios.get(item?.url);
                return detailData.data;
              })
            );

            const fetchpokemonNames = () => {
              let allNames: string[] = [];
              allNames = allNames.concat(
                data.results.map((pokemon: { name: string }) => pokemon.name)
              );
              console.warn(typeof allNames, "allNames");
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
              console.warn(typeof uniqueTypes, "uniqueTypes");

              return uniqueTypes;
            };

            console.warn(
              getAllUniquePokemonTypes(),
              "getAllUniquePokemonTypes()"
            );

            getAllUniquePokemonTypes().then((types) => {
              console.warn(typeof types, "hasil", types);
              setPokemonType(types);
            });

            setPokemons(pokemonData);
          }
        } catch {
          setError("Failed to fetch Pokémon data.");
        } finally {
          setLoading(false);
        }
      };

      fetchPokemon();
    }
  }, [limit]);

  const handleDetail = (item: PokemonDetails) => {
    setOpenDetail(true);
    setPokemonDetail(item);
  };

  const handleFilter = (item: string) => {
    console.warn(item, "itemstring");
  };

  const handleBack = () => {
    setOpenDetail(false);
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
              data={pokemons}
              handleDetail={handleDetail}
              handleFilter={handleFilter}
              pokemonType={pokemonType}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Pokemon;
