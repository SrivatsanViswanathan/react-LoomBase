import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoomiansSort } from "../features/globalSlice";
const LoomiansList = ({ filtered_loomians }) => {
  let { loomiansSort, loomiansSort2 } = useSelector((state) => state.global);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setLoomiansSort({
        sort: "none",
        sort2: "none",
        loomiansType: "all",
        loomiansType2: "all",
      })
    );
  }, [dispatch]);

  // if (isLoading) {
  //   return (
  //     <Wrapper>
  //       <div className='loom-load'>
  //         <div className='loading'></div>
  //       </div>
  //     </Wrapper>
  //   );
  // }

  const screenWidth = window.innerWidth;
  if (filtered_loomians) {
    return (
      <Wrapper>
        <div className='table-container normal'>
          <table>
            <tbody>
              {filtered_loomians.map((item, index) => {
                const {
                  name,
                  image,
                  abilities,
                  sAbility,
                  types,
                  stats,
                  soulBurst,
                } = item;
                let newName = name;
                if (soulBurst) {
                  newName = name.replace("Soulburst ", "");
                }
                return (
                  <tr
                    key={index}
                    className='loomians'
                    id={index % 2 ? "odd" : "even"}
                  >
                    <td className='name'>
                      <div className='image'>
                        <img src={image} alt={name} />
                      </div>
                      <p>
                        <Link
                          to={
                            soulBurst
                              ? `/loomians/${newName.toLowerCase()}`
                              : `/loomians/${name.toLowerCase()}`
                          }
                        >
                          {name}
                        </Link>
                      </p>
                    </td>
                    <td className='types'>
                      {types.map((item, index) => {
                        return (
                          <p className={item.toLowerCase()} key={index}>
                            <Link to={`/types/${item.toLowerCase()}`}>
                              {item}
                            </Link>
                          </p>
                        );
                      })}
                    </td>
                    {screenWidth > 760 ? (
                      <>
                        <td className='ability'>
                          {abilities.map((item, index) => {
                            return (
                              <Link
                                to={`/abilities/${item.toLowerCase()}`}
                                key={index}
                              >
                                {item}
                              </Link>
                            );
                          })}
                        </td>
                        <td className='special-ability'>
                          {sAbility.map((item, index) => {
                            return (
                              <Link
                                to={`/abilities/${item.toLowerCase()}`}
                                key={index}
                              >
                                {item}
                              </Link>
                            );
                          })}
                        </td>
                        <td
                          className='stats'
                          style={{
                            background:
                              loomiansSort === "hp" || loomiansSort2 === "hp"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>HP</p>
                          <p>{stats.hp}</p>
                        </td>
                        <td
                          className='stats'
                          style={{
                            background:
                              loomiansSort === "energy" ||
                              loomiansSort2 === "energy"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>En</p>
                          <p>{stats.energy}</p>
                        </td>
                        <td
                          className='stats'
                          style={{
                            background:
                              loomiansSort === "meleeAttack" ||
                              loomiansSort2 === "meleeAttack"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>AtkM</p>
                          <p>{stats.meleeAttack}</p>
                        </td>
                        <td
                          className='stats'
                          style={{
                            background:
                              loomiansSort === "meleeDefense" ||
                              loomiansSort2 === "meleeDefense"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>DefM</p>
                          <p>{stats.meleeDefense}</p>
                        </td>
                        <td
                          className='stats'
                          style={{
                            background:
                              loomiansSort === "rangedAttack" ||
                              loomiansSort2 === "rangedAttack"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>AtkR</p>
                          <p>{stats.rangedAttack}</p>
                        </td>
                        <td
                          className='stats'
                          style={{
                            background:
                              loomiansSort === "rangedDefense" ||
                              loomiansSort2 === "rangedDefense"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>DefR</p>
                          <p>{stats.rangedDefense}</p>
                        </td>
                        <td
                          className='stats'
                          style={{
                            background:
                              loomiansSort === "speed" ||
                              loomiansSort2 === "speed"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>Sp</p>
                          <p>{stats.speed}</p>
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  .loom-load {
    width: 95vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    margin-top: 3rem;
  }
  tr {
    min-width: 95%;
  }
  tbody {
    display: flex;
    flex-direction: column;
  }
  .loomians {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
  .loomians .name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0rem;
    width: 10rem;
  }
  .loomians .name a {
    color: var(--textColor);
    line-height: 1.2;
  }
  .loomians .name a:hover {
    border-bottom: 1px solid var(--textColor);
  }
  .loomians .ability,
  .loomians .special-ability {
    display: flex;
    width: 9rem;
    flex-wrap: wrap;
  }
  .loomians .types {
    display: flex;
    gap: 0.3rem;
    width: 9rem;
    justify-content: flex-start;
    align-items: center;
  }
  .loomians .stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 0.25rem;
    gap: 0.3rem;
  }
  .table-container {
    overflow-x: auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  img {
    width: 4rem;
    height: 3rem;
  }
  .types p {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    border-radius: 20px;
    min-width: 4.5rem;
    height: 1.75rem;
    padding-bottom: 0.1rem;
  }
  .ability a {
    color: var(--textColor);
    padding: 0.3rem 0.4rem;
  }

  .special-ability a {
    color: var(--textColor);
    padding: 0.3rem;
  }

  .ability a:hover,
  .special-ability a:hover {
    background: var(--statHighlight);
    border-radius: 10px;
  }

  .stats {
    padding: 0.5rem 1.2rem;
  }
  a {
    color: white;
  }

  @media (min-width: 760px) {
    height: auto;
    width: auto;
    table {
      margin: auto;
    }
    .table-container {
      margin-top: 1rem;
      overflow-y: hidden;
      display: block;
    }
  }

  @media (min-width: 1300px) {
    height: auto;
    width: auto;
    margin-bottom: 1rem;
    .table-container.normal {
      width: auto;
    }
    .table-container.moves {
      width: auto;
    }
    table {
      margin: auto;
    }
    .table-container {
      margin-top: 1rem;
      overflow-y: hidden;
    }
  }
`;
export default LoomiansList;
