/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const wrapper = css`
  background-color: white;
`;

const sectionTop = css`
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
  margin-bottom: 24px;
`;

const pokeTitlePg = css`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  padding-top: 15px;
`;

// const txtOfSearch = css`
//   font-size: 18px;
// `;

// const search = css`
//   height: 50px;
//   border-radius: 30px;
//   padding: 15px;
//   border: 1px solid #c8c8c8;
//   width: 100%;
//   margin-top: 16px;
// `;

const totalOfPoke = css`
  background-color: #5db9fc;
  color: white;
  margin-top: 18px;
  padding: 10px 15px;
  margin-bottom: 10px;
  & > span {
    font-weight: 600;
    margin-right: 10px;
  }
`;

const card = css`
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  background-color: #47d1af;
  border-radius: 12px;
  padding: 5px 15px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
`;

const imgPoke = css`
  background-color: #63d7bb;
  border-radius: 50%;
`;

const btnPrevNext = css`
    display: flex;
    justify-content: space-between;
    background: transparent;
    top: 50%;
    position: fixed;
    & div {
      cursor: pointer;
    }
    & span {
        text-decoration: none;
        display: inline-block;
        padding: 2px 17px;
        font-size: 22px;
        opacity: 0.8;
    }
        &:hover {
          color: black;
        }
      }
    }
  `;

const btn = css`
  background-color: #f1f1f1;
  color: black;
  width: 40px;
  height: 40px;
`;

const round = css`
  border-radius: 50%;
`;

const btnMyPoke = css`
  width: fit-content;
  padding: 10px;
  display: flex;
  border-radius: 30px;
  background-color: #224099;
  color: white;
  font-weight: 600;
  font-size: 18px;
  align-items: center;
  cursor: pointer;
`;

const countMyPoke = css`
  margin-right: 15px;
  background-color: white;
  color: #224099;
  min-width: 25px;
  text-align: center;
  border-radius: 50%;
  padding: 2px 10px;
`;

const ListPokemon = () => {
  //   const renderCard = () => {
  //     return props.pokemonList.map(({name, image}) => (
  //       <div key={i} className="col-lg-4 col-md-12">
  //         <div css={card} onClick={(e) => handleDetail(e, item.name)}>
  //           <div>{item.name}</div>
  //           <div css={imgPoke}>
  //             <img src={item.image} alt={`image_${item.name}`} />
  //           </div>
  //         </div>
  //       </div>
  //     ));
  //   };

  return (
    <div css={wrapper}>
      <div className="container-fluid">
        <section css={sectionTop}>
          <div className="row">
            <div className="col-12">
              <div css={pokeTitlePg}>Pokedex</div>
              {/* <div css={txtOfSearch}>Cari pokemon berdasarkan nama</div>
                <input css={search} type="text" onChange={() => {}} /> */}
            </div>
          </div>

          {/* {getMyPokemon() && getMyPokemon().length > 0 && (
              <div
                className="row"
                css={{ justifyContent: "flex-end", padding: "20px 15px 0 15px" }}
              >
                <div css={btnMyPoke} onClick={() => setOpenMyPoke(true)}>
                  <span css={countMyPoke}>{getMyPokemon().length}</span>
                  My Pokemon
                </div>
              </div>
            )}
   */}
          {/* <div className="row">
              <div css={totalOfPoke}>
                {totalData > 0 ? (
                  <div>
                    <span>{totalData}</span> Pokemon ditemukan
                  </div>
                ) : (
                  <div>Pokemon tidak ditemukan</div>
                )}
              </div>
            </div> */}
        </section>

        {/* <div className="row">{pokemonList && renderCard()}</div> */}

        {/* <div className="row">
            <div css={btnPrevNext}>
              <div>
                {offset > 0 && (
                  <span css={[btn, round]} onClick={handlePrev}>
                    &#8249;
                  </span>
                )}
              </div>
              <div>
                {pokemonList &&
                  pokemonList.length > 0 &&
                  totalData - limit > offset && (
                    <span css={[btn, round]} onClick={handleNext}>
                      &#8250;
                    </span>
                  )}
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default ListPokemon;
