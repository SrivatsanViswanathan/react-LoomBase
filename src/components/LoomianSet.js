import { styled } from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
const LoomianSet = ({ data }) => {
  const [page, setPage] = useState(0);

  const prevPage = (sets) => {
    setPage((oldPage) => {
      let nextPage = oldPage - 1;
      if (nextPage < 0) {
        nextPage = sets.length - 1;
      }
      return nextPage;
    });
  };

  const nextPage = (sets) => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > sets.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  const paginate = (sets) => {
    const itemsPerPage = 3;
    const pages = Math.ceil(sets.length / itemsPerPage);
    const newSets = Array.from({ length: pages }, (_, index) => {
      const start = index * itemsPerPage;
      return sets.slice(start, start + itemsPerPage);
    });
    return newSets;
  };

  if (data) {
    const { overview, credit } = data;

    let newSets = [];

    if (data.sets) {
      newSets = paginate(data.sets);
    }

    return (
      <Wrapper>
        <div className='sets'>
          <div className='overview'>
            <h4>Overview</h4>
            <p className='overview-desc'>
              {overview ? overview : "No overview explanation yet."}
            </p>
            <p className='overview-credit'>
              {credit ? `Written by : ${credit}` : ""}
            </p>
          </div>
          <div className='button-container'>
            {data.sets ? (
              <div>
                <button className='prev-btn' onClick={() => prevPage(newSets)}>
                  prev
                </button>
                {page + 1} / {newSets.length}
                <button className='next-btn' onClick={() => nextPage(newSets)}>
                  next
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className='set-details'>
            {data && data.sets ? (
              <div>
                {newSets[page].map((item, index) => {
                  const {
                    setName,
                    author,
                    moves,
                    items,
                    abilities,
                    personalities,
                    tps,
                    ups,
                    detail,
                    teamOptions,
                    otherOptions,
                  } = item;
                  const detailsText = detail.replace(/\|/g, "\n");
                  const teamOptionsText = teamOptions.replace(/\|/g, "\n");
                  const otherOptionsText = otherOptions.replace(/\|/g, "\n");
                  return (
                    <div key={index}>
                      <h5>{setName}</h5>
                      <div className='box'>
                        <div className='left'>
                          <div>
                            Move 1 :{" "}
                            <span className='move-list'>
                              {moves[0].map((move, index) => {
                                return (
                                  <span key={index}>
                                    <Link
                                      to={
                                        move.toLowerCase() !== "no move"
                                          ? `/moves/${move.toLowerCase()}`
                                          : "#"
                                      }
                                    >
                                      {move}
                                    </Link>
                                    <span>
                                      {index !== moves[0].length - 1
                                        ? " / "
                                        : ""}
                                    </span>
                                  </span>
                                );
                              })}
                            </span>
                          </div>
                          <div>
                            Move 2 :{" "}
                            <span className='move-list'>
                              {moves[1].map((move, index) => {
                                return (
                                  <span key={index}>
                                    <Link
                                      to={
                                        move.toLowerCase() !== "no move"
                                          ? `/moves/${move.toLowerCase()}`
                                          : "#"
                                      }
                                    >
                                      {move}
                                    </Link>
                                    <span>
                                      {index !== moves[1].length - 1
                                        ? " / "
                                        : ""}
                                    </span>
                                  </span>
                                );
                              })}
                            </span>
                          </div>
                          <div>
                            Move 3 :{" "}
                            <span className='move-list'>
                              {moves[2].map((move, index) => {
                                return (
                                  <span key={index}>
                                    <Link
                                      to={
                                        move.toLowerCase() !== "no move"
                                          ? `/moves/${move.toLowerCase()}`
                                          : "#"
                                      }
                                    >
                                      {move}
                                    </Link>
                                    <span>
                                      {index !== moves[2].length - 1
                                        ? " / "
                                        : ""}
                                    </span>
                                  </span>
                                );
                              })}
                            </span>
                          </div>
                          <div>
                            Move 4 :{" "}
                            <span className='move-list'>
                              {moves[3].map((move, index) => {
                                return (
                                  <span key={index}>
                                    <Link
                                      to={
                                        move.toLowerCase() !== "no move"
                                          ? `/moves/${move.toLowerCase()}`
                                          : "#"
                                      }
                                    >
                                      {move}
                                    </Link>
                                    <span>
                                      {index !== moves[3].length - 1
                                        ? " / "
                                        : ""}
                                    </span>
                                  </span>
                                );
                              })}
                            </span>
                          </div>
                        </div>
                        <div className='right'>
                          <div className='item'>
                            <div className='name'>Item : </div>
                            <div className='items-list'>
                              {items.map((item, index) => {
                                return (
                                  <div key={item}>
                                    <Link to={`/items/${item.toLowerCase()}`}>
                                      {item}
                                    </Link>
                                    <span>
                                      {index !== items.length - 1 ? " / " : ""}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className='ability'>
                            <div className='name'>Ability : </div>
                            <div>
                              {abilities.map((item, index) => {
                                return (
                                  <div key={item}>
                                    <Link
                                      to={`/abilities/${item.toLowerCase()}`}
                                    >
                                      {item}
                                    </Link>
                                    {index !== abilities.length - 1
                                      ? " / "
                                      : ""}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className='personality'>
                            <div className='name'>Personality : </div>
                            <div className='personality-row'>
                              {personalities.map((item, index) => {
                                return (
                                  <div key={item}>
                                    {item}
                                    {index !== personalities.length - 1
                                      ? " / "
                                      : ""}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className='tp'>
                            <div className='name'>TP : </div>
                            <div className='tp-row'>
                              <div>{tps}</div>
                            </div>
                          </div>
                          {ups ? (
                            <>
                              <div className='tp'>
                                <div className='name'>UP : </div>
                                <div>{ups}</div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className='set-info'>
                        <div className='details'>
                          <h5 className='name'>Details</h5>
                          <ul className='list details-desc'>
                            {detailsText.split("\n").map((line, index) => {
                              return <li key={index}>{line}</li>;
                            })}
                          </ul>
                        </div>
                        {teamOptions ? (
                          <div className='teamOptions'>
                            <h5 className='name'>Team Options</h5>
                            <div className='team-options'>
                              <ul className='list'>
                                {teamOptionsText
                                  .split("\n")
                                  .map((line, index) => {
                                    return <li key={index}>{line}</li>;
                                  })}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {otherOptions ? (
                          <div className='teamOptions'>
                            <h5 className='name'>Other Options</h5>
                            <div className='team-options'>
                              <ul className='list'>
                                {otherOptionsText
                                  .split("\n")
                                  .map((line, index) => {
                                    return <li key={index}>{line}</li>;
                                  })}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className='credits'>
                          <h5 className='name'>Credits</h5>
                          <p className='credits-desc'>Written by : {author}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className='button-container'>
                  {data.sets ? (
                    <div>
                      <button
                        className='prev-btn'
                        onClick={() => prevPage(newSets)}
                      >
                        prev
                      </button>
                      {page + 1} / {newSets.length}
                      <button
                        className='next-btn'
                        onClick={() => nextPage(newSets)}
                      >
                        next
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              "No sets for this Loomian at the moment :("
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .sets {
    display: flex;
    flex-direction: column;
    width: auto;
    justify-content: center;
    align-items: center;
  }
  button {
    border: transparent;
    background: var(--primary-200);
    padding: 0.25rem 0.5rem;
    text-transform: capitalize;
    margin: 0 1rem;
    cursor: pointer;
  }
  .overview,
  .details,
  .teamOptions,
  .credits {
    width: 96vw;
  }
  .box {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    padding: 1rem 0;
    gap: 0.75rem;
    box-shadow: 2px 2px 10px 3px var(--abilityColor);
    width: 96vw;
    margin-right: auto;
    margin-left: auto;
    flex-wrap: wrap;
    background: var(--moveColor);
  }
  .left,
  .right {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    gap: 0.75rem;
    flex-wrap: wrap;
    min-width: 43vw;
  }
  .left > div {
    gap: 0.25rem;
    display: flex;
    align-items: center;
  }
  .move-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 18rem;
    gap: 0.2rem;
  }
  .item,
  .ability,
  .personality,
  .tp {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    flex-wrap: wrap;
  }
  .tp > div,
  .personality > div,
  .ability > div {
    display: flex;
    gap: 0.2rem;
  }
  .tp-row,
  .personality-row {
    display: flex;
    max-width: 16rem;
    flex-direction: row;
    flex-wrap: wrap;
    line-height: 1.2;
    transform: translateY(-2px);
  }
  .tp-row {
    line-height: 1.2;
    transform: translateY(-2px);
  }
  .items-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 18rem;
    gap: 0.15rem;
  }
  .overview-desc {
    margin: auto;
    margin-top: 1rem;
    width: 95%;
  }
  .overview-credit {
    margin: 0.5rem 0;
    display: flex;
    width: 95%;
    justify-content: flex-start;
  }
  .set-details {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: auto;
  }
  .details,
  .teamOptions {
    margin-top: 2rem;
  }

  .list {
    padding-left: 1rem;
  }
  .teamOptions {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  h5 {
    margin-bottom: 1rem;
  }
  .list {
    list-style: circle;
  }
  li {
    margin: 1rem;
  }
  .credits {
    margin-bottom: 2rem;
  }
  .credits-desc {
    margin-left: 0.5rem;
  }
  .overview p,
  .details {
    line-height: 1.75;
  }
  a {
    color: var(--textColor);
    border-bottom: 1px solid transparent;
  }
  a:hover {
    border-bottom: 1px solid var(--textColor);
  }
  @media (min-width: 992px) {
    margin-left: 5.85rem;
    .button-container {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      margin-bottom: 2rem;
    }
    .overview,
    .details,
    .teamOptions,
    .credits {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 50rem;
    }
    .overview-desc {
      margin: 0;
      margin-top: 1rem;
    }
    .list {
      padding-left: 1rem;
    }

    .box {
      width: auto;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      width: auto;
      flex-wrap: none;
      gap: 0rem;
    }
    .left,
    .right {
      width: auto;
      min-width: 10rem;
    }
    .left {
      margin-left: 2rem;
    }
    .right {
      margin-right: 2rem;
      max-width: 35rem;
    }
    .tp-row,
    .personality-row {
      display: flex;
      max-width: 16rem;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .items-list {
      display: flex;
      flex-wrap: wrap;
      max-width: 15rem;
      gap: 0.15rem;
    }
    .set-details {
      margin-top: 0rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 50rem;
    }
    .tp {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .sets {
      gap: 1rem;
    }
    .name {
      display: flex;
      min-width: 6rem;
      justify-content: flex-end;
    }
    h5.name {
      justify-content: flex-start;
    }
    .set-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .credits-desc {
      margin-left: 1rem;
    }
  }
  @media (min-width: 1800px) {
    margin-left: 9rem;
  }
`;
export default LoomianSet;
