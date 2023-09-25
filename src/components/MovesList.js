import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovesList = ({ filtered_moves }) => {
  const { movesSort } = useSelector((state) => state.global);
  const screenWidth = window.innerWidth;

  // if (isLoading) {
  //   return (
  //     <Wrapper>
  //       <div className='move-load'>
  //         <div className='loading'></div>
  //       </div>
  //     </Wrapper>
  //   );
  // }

  if (filtered_moves) {
    return (
      <Wrapper>
        <div className='table-container'>
          <table>
            <tbody>
              {filtered_moves.map((item, index) => {
                const {
                  name,
                  type,
                  category,
                  strength,
                  energyCost,
                  accuracy,
                  description,
                } = item;
                return (
                  <tr key={index} className='moves'>
                    <td className='name'>
                      <p>
                        <Link to={`/moves/${name.toLowerCase()}`}>{name}</Link>
                      </p>
                    </td>
                    <td className='type'>
                      <p className={type.toLowerCase()}>
                        <Link
                          to={
                            type.toLowerCase() !== "various"
                              ? `/types/${type.toLowerCase()}`
                              : "/types"
                          }
                        >
                          {type}
                        </Link>
                      </p>
                    </td>
                    {screenWidth > 992 ? (
                      <>
                        <td className='category'>
                          <p>{category}</p>
                        </td>
                        <td
                          className='power stats'
                          style={{
                            background:
                              movesSort === "strength"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>Strength</p>
                          <p>{strength ? strength : "---"}</p>
                        </td>
                        <td
                          className='accuracy stats'
                          style={{
                            background:
                              movesSort === "accuracy"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>Accuracy</p>
                          <p>
                            {accuracy && typeof accuracy === "number"
                              ? accuracy * 100
                              : accuracy.length > 0
                              ? accuracy
                              : "---"}
                          </p>
                        </td>
                        <td
                          className='energy-cost stats'
                          style={{
                            background:
                              movesSort === "energy"
                                ? "var(--statHighlight)"
                                : "",
                          }}
                        >
                          <p>Energy Cost</p>
                          <p>{energyCost ? energyCost : "---"}</p>
                        </td>
                        <td className='description'>
                          <p>{description}</p>
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
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  .move-load {
    width: 95vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    margin-top: 3rem;
  }
  table {
    margin: auto;
  }
  .moves {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    min-height: 2.5rem;
  }
  .moves .name {
    width: 7rem;
  }
  .moves .name a {
    color: var(--textColor);
    line-height: 1.2;
  }
  .moves .name a:hover {
    border-bottom: 1px solid var(--textColor);
  }
  .moves .type,
  .moves .category {
    width: 6rem;
    line-height: 1.25;
  }
  .moves .power,
  .moves .accuracy,
  .moves .energy-cost {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .moves .power,
  .moves .accuracy {
    width: 4rem;
  }
  .moves .energy-cost {
    width: 5.4rem;
  }
  .moves .description {
    width: 38rem;
    line-height: 1.5;
  }
  .table-container {
    overflow-x: auto;
    width: 100%;
  }
  .type p {
    padding: 0.3rem 1rem;
    text-align: center;
    color: white;
    border-radius: 20px;
    width: 6rem;
  }
  a {
    color: white;
  }
  .stats {
    padding: 1rem 0;
  }
  @media (min-width: 992px) {
    min-height: auto;
    width: auto;
    .moves {
      gap: 2rem;
      max-height: 4.5rem;
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

export default MovesList;
