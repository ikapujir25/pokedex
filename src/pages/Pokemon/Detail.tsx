/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PokemonDetails, PokemonAbility, PokemonMove } from "./type";
import axios from "axios";
import { useEffect, useState } from "react";

const wrapper = css`
  background:linear-gradient( 174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4% );
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 20px;
margin: 2rem;
  box-shadow: "10px 10px 30px -14px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 30px -14px rgba(0,0,0,0.75);
box-shadow: 10px 10px 30px -14px rgba(0,0,0,0.75)
`;

const sectionTop = css`
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 20px;
  paddingbottom: 20px;
`;

const pokeTitlePg = css`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  padding-top: 15px;
  text-transform: uppercase;
`;

const pokeSubtitle = css`
  font-size: 20px;
  font-weight: 600;
  //   text-align: center;
  padding-top: 15px;
  text-transform: uppercase;
`;

const pokeText = css`
  font-size: 16px;
  font-weight: 600;
  //   text-align: center;
  padding-top: 15px;
`;

const imgPoke = css`
  background-color: #63d7bb;
  border-radius: 50%;
  width: fit-content;
  minheight: 60px;
  height: 100%;
`;

const btn = css`
  color: white;
  margin-right: 20px;
  padding: 5px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
`;

const rowWrap = css`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
`;

const btnBack = css`
  color: #4cc9fe;
  margin-right: 20px;
  padding: 5px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid #4cc9fe;
  background-color: #fff;
  cursor: pointer;
`;

const Detail = (props: PokemonDetails) => {
  const [moves, setMoves] = useState<PokemonMove[]>([]);
  const [ability, setAbility] = useState<PokemonAbility[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailMoves = async () => {
      try {
        const pokemonMoves = await Promise.all(
          props?.moves?.map(async (item) => {
            const { data } = await axios.get(item.move.url);
            return data;
          })
        );
        setMoves(pokemonMoves);
      } catch {
        setError("Failed to fetch Pokémon moves.");
      } finally {
        setLoading(false);
      }
    };

    const fetchDetailAbility = async () => {
      try {
        const pokemonAbility = await Promise.all(
          props?.abilities?.map(async (item) => {
            const { data } = await axios.get(item.ability.url);
            return data;
          })
        );
        setAbility(pokemonAbility);
      } catch {
        setError("Failed to fetch Pokémon ability.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetailMoves();
    fetchDetailAbility();
  }, []);

  return (
    <div css={wrapper}>
      <div className="row">
        {loading ? (
          <div css={pokeTitlePg}>loading...</div>
        ) : error ? (
          <div css={pokeTitlePg}>error...</div>
        ) : (
          <div className="col-12">
            <section css={sectionTop}>
              <span
                onClick={() => {
                  props.handleBack();
                }}
                css={btnBack}
              >
                &#8249; Back
              </span>
              <div css={pokeTitlePg}>Pokedex</div>
              <div css={pokeSubtitle}>{props.name}</div>
              <div css={imgPoke} style={{ marginTop: "20px" }}>
                <img
                  src={props.sprites.front_default}
                  alt={`image_${props.name}`}
                />
              </div>
            </section>

            <div css={pokeText}>Ability</div>
            <div className="row" css={rowWrap}>
              {(ability ?? []).map((el, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-12"
                  style={{
                    margin: "5px",
                  }}
                >
                  <span
                    key={index}
                    css={btn}
                    style={{
                      backgroundColor: "#7ED4AD",
                    }}
                  >
                    {el.name}
                  </span>
                </div>
              ))}
            </div>

            <div css={pokeText} style={{ marginTop: "20px" }}>
              Moves
            </div>
            <div className="row" css={rowWrap}>
              {(moves ?? []).map((el, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-12"
                  style={{
                    margin: "5px",
                  }}
                >
                  <span
                    key={index}
                    css={btn}
                    style={{
                      backgroundColor: "#DE7C7D",
                    }}
                  >
                    {el.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
