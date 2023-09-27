import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoomianSet from "./LoomianSet";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Title from "./Title";
import MovesList from "./MovesList";
import MovesFilter from "./MovesFilter";
import MovesSort from "./MovesSort";
import {
  setMoves,
  setMovesFilter,
  setMovesSort,
  setFilterCategories,
  setFilterTypes,
  setFilterTypeCategories,
} from "../features/globalSlice";
import Search from "./Search";

const DisplayLoomian = ({ data }) => {
  const {
    filtered_moves,
    filterCategory,
    filterTypeCategory,
    filterTypesBackup,
  } = useSelector((state) => state.global);
  const [index, setIndex] = useState(0);
  const [check, setChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data.length > 1) {
      if (!check) {
        setIndex(0);
      } else {
        setIndex(1);
      }
    }
  }, [check, data.length]);

  let {
    id,
    name,
    model,
    line,
    stats,
    types,
    abilities,
    sAbility,
    moves,
    soulBurst,
  } = data[index];

  let oldName = name;

  if (soulBurst) {
    const string = "Soulburst ";
    name = name.replace(string, "");
  }
  const {
    cachedLoomians,
    cachedTypes,
    cachedMoves,
    types: all_types,
    sets,
  } = useSelector((state) => state.global);

  const findIndexofLoom = sets.findIndex(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );

  let all_types_names = all_types.map((item) => item.name);
  const length = types.length;
  let type1 = types[0];
  let type2 = [];

  let type1Hash = cachedTypes[type1.toLowerCase()];
  let type2Hash = {};

  if (length > 1) {
    type2 = types[1];
    type2Hash = cachedTypes[type2.toLowerCase()];
  }

  let allMoves = [];

  useEffect(() => {
    const filterTypes = filterTypesBackup;
    let allMoves = [];
    let sortedMoves = [...moves].sort((a, b) => a.localeCompare(b));
    sortedMoves.forEach((item) => {
      if (cachedMoves[item.toLowerCase()] !== undefined) {
        allMoves.push(cachedMoves[item.toLowerCase()]);
      }
    });

    const filteredTypesToMoves = {};
    Object.keys(filterTypes).forEach((type) => {
      filteredTypesToMoves[type] = filterTypes[type].filter((move) =>
        allMoves.includes(move)
      );
    });

    const filteredCategoryToMoves = {};
    Object.keys(filterCategory).forEach((type) => {
      filteredCategoryToMoves[type] = filterCategory[type].filter((move) =>
        allMoves.includes(move)
      );
    });

    const filteredTypeCategoryToMoves = {};
    Object.keys(filterTypeCategory).forEach((type) => {
      filteredTypeCategoryToMoves[type] = filterTypeCategory[type].filter(
        (move) => allMoves.includes(move)
      );
    });

    dispatch(
      setMovesFilter({
        category: "all",
        type: "all",
      })
    );
    dispatch(
      setMovesSort({
        select: "name-a",
      })
    );
    dispatch(setMoves(allMoves));
    dispatch(setFilterTypes(filteredTypesToMoves));
    dispatch(setFilterCategories(filteredCategoryToMoves));
    dispatch(setFilterTypeCategories(filteredTypeCategoryToMoves));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`/sets/${name.toLowerCase()}.json`);
  //     const { data } = response;
  //     dispatch(addSets(data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const stronglyWeakTo = () => {
    let hasMatch = false;
    const result = type1Hash.weakTo.map((item1) => {
      return type2Hash.weakTo.map((item2) => {
        if (item1 === item2) {
          hasMatch = true;
          return (
            <div key={item2}>
              <p className={item2}>
                <Link to={`/types/${item2.toLowerCase()}`}>{item2}</Link>
              </p>
            </div>
          );
        }
        return null;
      });
    });

    if (hasMatch) {
      return result;
    } else {
      return "";
    }
  };

  const stronglyResistTo = () => {
    let hasMatch = false;
    const result = type1Hash.resists.map((item1) => {
      return type2Hash.resists.map((item2) => {
        if (item1 === item2) {
          hasMatch = true;
          return (
            <div key={item2}>
              <p className={item2}>
                <Link to={`/types/${item2.toLowerCase()}`}>{item2}</Link>
              </p>
            </div>
          );
        }
        return null;
      });
    });

    if (hasMatch) {
      return result;
    } else {
      return "";
    }
  };

  const weakTo = () => {
    const combinedArray = [];
    type1Hash.weakTo.forEach((item1) => {
      if (
        !type2Hash.resists.includes(item1) &&
        !type2Hash.weakTo.includes(item1)
      ) {
        combinedArray.push(item1);
      }
    });
    type2Hash.weakTo.forEach((item2) => {
      if (
        !type1Hash.resists.includes(item2) &&
        !type1Hash.weakTo.includes(item2)
      ) {
        combinedArray.push(item2);
      }
    });

    if (combinedArray.length > 0) {
      return combinedArray.map((item, index) => (
        <div key={item}>
          <p className={item}>
            {" "}
            <Link to={`/types/${item.toLowerCase()}`}>{item}</Link>
          </p>
        </div>
      ));
    } else {
      return "";
    }
  };

  const resists = () => {
    const combinedArray = [];
    type1Hash.resists.forEach((item1) => {
      if (
        !type2Hash.weakTo.includes(item1) &&
        !type2Hash.resists.includes(item1)
      ) {
        combinedArray.push(item1);
      }
    });
    type2Hash.resists.forEach((item2) => {
      if (
        !type1Hash.weakTo.includes(item2) &&
        !type1Hash.resists.includes(item2)
      ) {
        combinedArray.push(item2);
      }
    });

    if (combinedArray.length > 0) {
      return combinedArray.map((item, index) => (
        <div key={item}>
          <p className={item}>
            {" "}
            <Link to={`/types/${item.toLowerCase()}`}>{item}</Link>
          </p>
        </div>
      ));
    } else {
      return "";
    }
  };

  const normal = () => {
    let combinedArray = [].concat(all_types_names);
    type1Hash.weakTo.forEach((item1) => {
      if (type2Hash.weakTo.includes(item1)) {
        combinedArray = combinedArray.filter((item) => item !== item1);
      }
    });
    type1Hash.resists.forEach((item1) => {
      if (type2Hash.resists.includes(item1)) {
        combinedArray = combinedArray.filter((item) => item !== item1);
      }
    });
    type1Hash.weakTo.forEach((item1) => {
      if (
        !type2Hash.resists.includes(item1) &&
        !type2Hash.weakTo.includes(item1)
      ) {
        combinedArray = combinedArray.filter((item) => item !== item1);
      }
    });
    type2Hash.weakTo.forEach((item2) => {
      if (
        !type1Hash.resists.includes(item2) &&
        !type1Hash.weakTo.includes(item2)
      ) {
        combinedArray = combinedArray.filter((item) => item !== item2);
      }
    });

    type1Hash.resists.forEach((item1) => {
      if (
        !type2Hash.weakTo.includes(item1) &&
        !type2Hash.resists.includes(item1)
      ) {
        combinedArray = combinedArray.filter((item) => item !== item1);
      }
    });
    type2Hash.resists.forEach((item2) => {
      if (
        !type1Hash.weakTo.includes(item2) &&
        !type1Hash.resists.includes(item2)
      ) {
        combinedArray = combinedArray.filter((item) => item !== item2);
      }
    });

    if (combinedArray.length > 0) {
      return combinedArray.map((item, index) => (
        <div key={item}>
          <p className={item}>
            {" "}
            <Link to={`/types/${item.toLowerCase()}`}>{item}</Link>
          </p>
        </div>
      ));
    } else {
      return "";
    }
  };

  const singleWeakTo = () => {
    const result = type1Hash.weakTo.map((item) => {
      return (
        <div key={item}>
          <p className={item}>
            <Link to={`/types/${item.toLowerCase()}`}>{item}</Link>
          </p>
        </div>
      );
    });
    return result;
  };

  const singleResists = () => {
    const result = type1Hash.resists.map((item) => {
      return (
        <div key={item}>
          <p className={item}>
            <Link to={`/types/${item.toLowerCase()}`}>{item}</Link>
          </p>
        </div>
      );
    });
    return result;
  };

  const singleNormal = () => {
    let combinedArray = [].concat(all_types_names);

    type1Hash.weakTo.forEach((item1) => {
      combinedArray = combinedArray.filter((item) => item !== item1);
    });
    type1Hash.resists.forEach((item1) => {
      combinedArray = combinedArray.filter((item) => item !== item1);
    });

    if (combinedArray.length > 0) {
      return combinedArray.map((item, index) => (
        <div key={item}>
          <p className={item}>
            <Link to={`/types/${item.toLowerCase()}`}>{item}</Link>
          </p>
        </div>
      ));
    } else {
      return "";
    }
  };

  const statColor = (stat) => {
    if (stat < 50) {
      return "#dc2626";
    } else if (stat < 80) {
      return "#fb923c";
    } else if (stat < 100) {
      return "#facc15";
    } else if (stat < 120) {
      return "#22c55e";
    } else if (stat < 150) {
      return "#0ea5e9";
    } else {
      return "#d946ef";
    }
  };

  const calculateStyles = (stat) => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 996) {
      return stat * 1.4;
    } else {
      return stat * 2.8;
    }
  };

  const { paddingRight } = calculateStyles();

  return (
    <Wrapper paddingRight={paddingRight}>
      <div className='title'>
        <Title title={oldName}></Title>
      </div>
      <div className='basic-container'>
        <div className='basic-info'>
          <img className='image' src={model} alt={name} />
          <div>
            <div className='types'>
              <div className='name'>Soulburst : </div>
              {data.length > 1 ? (
                <input
                  onChange={() => {
                    setChecked(!check);
                  }}
                  type='checkbox'
                  id='checkbox'
                  checked={check}
                  className='checkbox'
                />
              ) : (
                <div>None</div>
              )}
            </div>
            <div className='types'>
              <div className='name'>Type : </div>
              <div className='loom-types'>
                {types.map((item) => {
                  return (
                    <div key={item}>
                      <p className={`${item.toLowerCase()} type`}>
                        <Link to={`/types/${item.toLowerCase()}`}>{item}</Link>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='abilities'>
              <div className='name'>Abilities : </div>
              <div className='all-abilities'>
                {abilities.map((item) => {
                  return (
                    <div key={item}>
                      <p className='ability'>
                        <Link to={`/abilities/${item.toLowerCase()}`}>
                          {item}
                        </Link>
                      </p>
                    </div>
                  );
                })}
                {sAbility.map((item) => {
                  return (
                    <div key={item}>
                      <p className='ability'>
                        <Link to={`/abilities/${item.toLowerCase()}`}>
                          {item}
                        </Link>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='evolution pc'>
              <div className='name'>Evolution : </div>
              <div className='line-box'>
                {line.map((item) => {
                  const loomian = cachedLoomians[item.toLowerCase()];
                  return (
                    <div key={item} className='line'>
                      <div className='evo-box'>
                        <Link
                          onClick={() => {
                            setIndex(0);
                            setChecked(false);
                          }}
                          to={`/loomians/${loomian[0].name.toLowerCase()}`}
                        >
                          <img
                            className='line-img'
                            src={loomian[0].image}
                            alt={item}
                          />
                          <div className='evo-name'>
                            {loomian[0].name.toLowerCase()}
                          </div>
                        </Link>
                        <div></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='evolution mobile'>
        {line.map((item) => {
          const loomian = cachedLoomians[item.toLowerCase()];
          return (
            <div key={item} className='line'>
              <div className='box'>
                <Link
                  onClick={() => setIndex(0)}
                  to={`/loomians/${loomian[0].name}`}
                >
                  <img className='line-img' src={loomian[0].image} alt={item} />
                  <div className='evo-name'>{loomian[0].name}</div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className='evo-stats'>
        <div className='stats'>
          <h4>Base Stats</h4>
          <div className='stat-box'>
            <div className='name'>HP : </div>
            <div className='stat'>
              <div>{stats.hp}</div>
              <div
                className='rectangle'
                style={{
                  paddingRight: `${calculateStyles(stats.hp)}px`,
                  backgroundColor: `${statColor(stats.hp)}`,
                }}
              ></div>
            </div>
          </div>
          <div className='stat-box'>
            <div className='name'>Energy : </div>
            <div className='stat'>
              <div>{stats.energy}</div>
              <div
                className='rectangle'
                style={{
                  paddingRight: `${calculateStyles(stats.energy)}px`,
                  backgroundColor: `${statColor(stats.energy)}`,
                }}
              ></div>
            </div>
          </div>
          <div className='stat-box'>
            <div className='name'>Melee Attack : </div>
            <div className='stat'>
              <div>{stats.meleeAttack}</div>
              <div
                className='rectangle'
                style={{
                  paddingRight: `${calculateStyles(stats.meleeAttack)}px`,
                  backgroundColor: `${statColor(stats.meleeAttack)}`,
                }}
              ></div>
            </div>
          </div>
          <div className='stat-box'>
            <div className='name'>Melee Defense : </div>
            <div className='stat'>
              <div>{stats.meleeDefense}</div>
              <div
                className='rectangle'
                style={{
                  paddingRight: `${calculateStyles(stats.meleeDefense)}px`,
                  backgroundColor: `${statColor(stats.meleeDefense)}`,
                }}
              ></div>
            </div>
          </div>
          <div className='stat-box'>
            <div className='name'>Ranged Attack : </div>
            <div className='stat'>
              <div>{stats.rangedAttack}</div>
              <div
                className='rectangle'
                style={{
                  paddingRight: `${calculateStyles(stats.rangedAttack)}px`,
                  backgroundColor: `${statColor(stats.rangedAttack)}`,
                }}
              ></div>
            </div>
          </div>
          <div className='stat-box'>
            <div className='name'>Ranged Defense : </div>
            <div className='stat'>
              <div>{stats.rangedDefense}</div>
              <div
                className='rectangle'
                style={{
                  paddingRight: `${calculateStyles(stats.rangedDefense)}px`,
                  backgroundColor: `${statColor(stats.rangedDefense)}`,
                }}
              ></div>
            </div>
          </div>
          <div className='stat-box'>
            <div className='name'>Speed : </div>
            <div className='stat'>
              <div>{stats.speed}</div>
              <div
                className='rectangle'
                style={{
                  paddingRight: `${calculateStyles(stats.speed)}px`,
                  backgroundColor: `${statColor(stats.speed)}`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className='type-effectiveness'>
          <div className='type-affect'>
            <h4>Type Effectiveness</h4>
            <div className='type-row'>
              <div className='type-box'>
                <div className='name'>Very weak to : </div>
                <div className='types-list'>
                  {length > 1 ? stronglyWeakTo() : ""}
                </div>
              </div>
              <div className='type-box'>
                <div className='name'>Weak to : </div>
                <div className='types-list'>
                  {length > 1 ? weakTo() : singleWeakTo()}
                </div>
              </div>
              <div className='type-box'>
                <div className='name'>Normal : </div>
                <div className='types-list'>
                  {length > 1 ? normal() : singleNormal()}
                </div>
              </div>
              <div className='type-box'>
                <div className='name'>Resists : </div>
                <div className='types-list'>
                  {length > 1 ? resists() : singleResists()}
                </div>
              </div>
              <div className='type-box'>
                <div className='name'>Strongly resists : </div>
                <div className='types-list'>
                  {length > 1 ? stronglyResistTo() : ""}
                </div>
              </div>
              <div className='type-box'>
                <div className='name'>Immune to : </div>
                <div className='types-list'>
                  {length > 1
                    ? [
                        ...type1Hash.immuneTo.map((item1) => item1),
                        ...type2Hash.immuneTo.map((item2) => item2),
                      ].length > 0
                      ? [
                          ...type1Hash.immuneTo.map((item1) => (
                            <div key={item1}>
                              <p className={item1}>
                                <Link to={`/types/${item1.toLowerCase()}`}>
                                  {item1}
                                </Link>
                              </p>
                            </div>
                          )),
                          ...type2Hash.immuneTo.map((item2) => (
                            <div key={item2}>
                              <p className={item2}>
                                <Link to={`/types/${item2.toLowerCase()}`}>
                                  {item2}
                                </Link>
                              </p>
                            </div>
                          )),
                        ]
                      : ""
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='loom-sets'>
        <LoomianSet data={sets[findIndexofLoom]}></LoomianSet>
      </div>
      <div className='loom-moves'>
        <Title title={"moves"}></Title>
        <div className='manip'>
          <div></div>
          <div className='sort'>
            <MovesSort></MovesSort>
            <MovesFilter></MovesFilter>
          </div>
          <div>
            <Search searchType={"moves"}></Search>
          </div>
        </div>
        <div className='moves-list'>
          <MovesList
            filtered_moves={filtered_moves}
            loomMoves={allMoves}
          ></MovesList>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .manip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    gap: 1rem;
  }
  .loom-moves {
    margin-bottom: 2rem;
  }
  .checkbox {
    margin-top: 0.2rem;
    border: transparent;
    background: transparent;
    text-transform: capitalize;
    cursor: pointer;
  }
  .evolution.pc {
    display: none;
    text-transform: capitalize;
  }
  .evolution.mobile {
    margin-top: 2rem;
  }
  .line-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    max-width: 18rem;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .basic-container {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .basic-info {
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
  }
  .basic-info > div {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .types,
  .abilities {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .loom-types {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 0.5rem;
  }
  .types .name,
  .abilities .name,
  .evolution .name {
    width: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .type {
    padding: 0.25rem 1rem;
    width: 5.6rem;
    text-align: center;
    border-radius: 20px;
  }
  .type-affect .name {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .types-list {
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 0.3rem;
    flex-wrap: wrap;
  }
  .types-list p {
    padding: 0.25rem 1rem;
    width: 5.6rem;
    text-align: center;
    border-radius: 20px;
    text-transform: capitalize;
  }
  .type-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .type-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .abilities {
    display: flex;
  }
  .all-abilities {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .stats h4 {
    margin-bottom: 0.75rem;
  }
  .type-affect h4 {
    margin-bottom: 0.5rem;
  }
  h4 {
    margin: auto;
  }
  .stats,
  .type-effectiveness {
    margin-top: 2rem;
  }
  .stats,
  .type-affect {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .type-affect {
    margin-bottom: 1rem;
  }
  .stat-box {
    display: flex;
    gap: 1rem;
  }
  .stat-box .name {
    display: flex;
    width: 8.5rem;
    justify-content: flex-end;
  }
  .stat {
    display: flex;
    gap: 0.5rem;
  }
  .stat > div {
    display: flex;
    min-width: 1.5rem;
    justify-content: flex-end;
  }
  .rectangle {
    border-radius: 10px;
  }
  .evolution {
    margin-top: -1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .evolution.mobile {
    display: flex;
    max-width: 90%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .line {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .line .box {
    text-align: center;
  }
  .line-img {
    width: 2.7rem;
    height: auto;
  }
  .image {
    max-width: 12rem;
    max-height: 13rem;
  }
  .types a,
  .type-affect a,
  .moves-list a {
    color: white;
  }
  a {
    color: var(--textColor);
  }
  .abilities a {
    border-bottom: 1px solid transparent;
  }
  .abilities a:hover {
    border-bottom: 1px solid var(--textColor);
  }
  .moves-list .stats {
    margin-bottom: 2rem;
  }
  @media (min-width: 750px) {
    .evolution.pc {
      display: flex;
    }
    .evolution.mobile {
      display: none;
    }
    .loom-types {
      flex-direction: row;
    }
    .type-affect .name {
      display: flex;
      width: 8rem;
      align-items: start;
      padding-top: 0.12rem;
      justify-content: flex-end;
    }
    .type-row {
      gap: 0;
    }
    .type-box {
      flex-direction: row;
      padding: 0.155rem 0;
    }
    .type-box:hover {
      box-shadow: 0 0 10px 5px var(--primary-400);
    }
    .types,
    .abilities,
    .evolution {
      gap: 1rem;
      justify-content: start;
    }
    .types-list {
      justify-content: flex-start;
      max-width: 30rem;
      flex-wrap: wrap;
    }
    .manip {
      gap: 2rem;
    }
    .manip > div {
      display: flex;
      flex: 1;
    }
    .sort {
      justify-content: center;
      min-width: 40rem;
      gap: 1.5rem;
    }
    .evo-name {
      display: flex;
      max-width: 4.5rem;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  @media (min-width: 1500px) {
    height: auto;
    width: calc(100vw - 11rem);
    .basic-info > div {
      gap: 1rem;
    }

    .abilities {
      margin-top: 1rem;
    }

    .evolution.pc {
      display: flex;
      flex-direction: row;
    }
    .evolution {
      margin-top: 0rem;
      gap: 0.5rem;
    }
    .stat-box {
      margin-right: 5rem;
    }
    .type-row {
      gap: 0;
    }
    .types,
    .abilities,
    .evolution {
      gap: 0.5rem;
    }
    .types-list {
      justify-content: flex-start;
      max-width: 30rem;
      flex-wrap: wrap;
    }
    .image {
      height: 13rem;
      width: auto;
    }
    .evo-stats {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .line-img {
      width: 3.5rem;
      height: auto;
    }
    h4 {
      margin: 0;
    }
    .stats {
      gap: 0.75rem;
      width: auto;
      width: 42vw;
    }
    .type-effectiveness {
      width: auto;
      height: 17rem;
    }
    .loom-sets {
      display: flex;
      width: 100%;
    }
    .manip {
      width: calc(100vw - 30rem);
      flex-direction: row;
    }
  }
`;
export default DisplayLoomian;
