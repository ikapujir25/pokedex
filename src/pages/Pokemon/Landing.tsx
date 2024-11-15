/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsLanding } from "./type";
import { useState } from "react";

const wrapper = css`
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-size: cover;
`;

const sectionTop = css`
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
  margin-bottom: 20px;
  paddingbottom: 20px;
`;

const pokeTitlePg = css`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  padding-top: 15px;
`;

const txtOfSearch = css`
  font-size: 18px;
  padding-left: 4.5rem;
`;

const card = css`
  border: 1px solid #47d1af;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  color: #000;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #47d1af;
    transform: translateY(-5px);
  }
  width: 250px;
`;

const cardType = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 5px 10px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  font-size: 10px;
`;

const imgPoke = css`
  background-color: #63d7bb;
  border-radius: 50%;
`;

const btn = css`
  color: white;
  cursor: pointer;
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
  justify-content: center;
`;

const btnWrapper = css`
  flex-direction: row;
  display: flex;
  margin-right: 20px;
  padding-top: 10px;
  padding-left: 4.5rem;
  flex-wrap: wrap;
  margin-bottom: 10px;
  align-items: center;
`;

const btnCancel = css`
  margin-right: 20px;
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 26px;
  cursor: pointer;
  padding: 0px 10px;
  color: #fff;
`;

const btnAction = css`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
`;

const Landing = (props: PropsLanding) => {
  const [active, setActive] = useState("");

  return (
    <div css={wrapper}>
      <div className="container-fluid">
        <section css={sectionTop}>
          <div className="row">
            <div className="col-12 mb-10">
              <div css={pokeTitlePg}>Pokedex</div>
              <div css={txtOfSearch}>Find Your Pokemon by</div>
              <div css={btnWrapper}>
                {props.pokemonType?.map((item) => (
                  <span
                    onClick={() => {
                      props.handleFilter(item);
                      setActive(item);
                    }}
                    css={btn}
                    style={{
                      backgroundColor:
                        active === ""
                          ? ["water", "flying"].includes(item)
                            ? "#7AB2D3"
                            : ["poison", "fire"].includes(item)
                            ? "#FA4659"
                            : ["normal"].includes(item)
                            ? "#A66E38"
                            : "#9EDF9C"
                          : active === item
                          ? "#FC8F54"
                          : "#b6b6b6",
                    }}
                  >
                    {item}
                  </span>
                ))}
                {active !== "" && (
                  <span
                    onClick={() => {
                      setActive("");
                      props.handleClose("");
                    }}
                    css={btnCancel}
                    style={{
                      backgroundColor: "#4F75FF",
                    }}
                  >
                    &#215;
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="row" css={rowWrap}>
          {(props?.data ?? []).map((item, index) => (
            <div key={index} className="col-lg-4 col-md-12">
              <div
                css={card}
                onClick={() => {
                  props.handleDetail(item);
                }}
              >
                <div className="col">
                  <div style={{ marginRight: "20px", marginBottom: "10px" }}>
                    {item.name}
                  </div>
                  {item?.types?.map((element, index) => (
                    <div
                      key={index}
                      css={cardType}
                      style={{
                        marginRight: "20px",
                        textAlign: "start",
                        backgroundColor: ["water", "flying"].includes(
                          element.type.name
                        )
                          ? "#7AB2D3"
                          : ["poison", "fire"].includes(element.type.name)
                          ? "#FA4659"
                          : ["normal"].includes(element.type.name)
                          ? "#A66E38"
                          : "#9EDF9C",
                      }}
                    >
                      {element.type.name}
                    </div>
                  ))}
                </div>
                <div css={imgPoke}>
                  <img
                    src={item.sprites.front_default}
                    alt={`image_${item.name}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="row"
          style={{
            justifyContent: "space-between",
            display: "flex",
            margin: "2rem 4.5rem",
          }}
        >
          <button
            onClick={() => {
              props.handlePrevious("");
            }}
            css={btnAction}
            style={{
              backgroundColor: props.activate === "" ? "#E4E0E1" : "#fff",
              color: props.activate === "" ? "white" : "#4F75FF",
              border: `2px solid ${
                props.activate === "" ? "#E4E0E1" : "#4F75FF"
              }`,
            }}
            disabled={props.activate === ""}
          >
            Previous
          </button>
          <button
            onClick={() => {
              props.handleNext("");
            }}
            css={btnAction}
            style={{
              backgroundColor: "#4F75FF",
              color: "white",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
