import { styled } from "styled-components";
import Title from "./Title";
import LoomiansList from "./LoomiansList";
import { useEffect } from "react";
import LoomiansFilter from "./LoomiansFilter";
import LoomiansSort from "./LoomiansSort";
import { useSelector, useDispatch } from "react-redux";
import { setFilterTypesLoomians, setLoomians } from "../features/globalSlice";
import { Search } from "../components";
import { Link } from "react-router-dom";
const DisplayMove = ({ data, loomians }) => {
  const {
    type,
    category,
    strength,
    accuracy,
    energyCost,
    priority,
    description,
  } = data;

  const { filterTypesLooms, filtered_loomians } = useSelector(
    (state) => state.global
  );
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const filteredTypesToLooms = {};

    Object.keys(filterTypesLooms).forEach((type) => {
      if (loomians) {
        filteredTypesToLooms[type] = filterTypesLooms[type].filter((loom) => {
          return loomians.includes(loom);
        });
      } else {
        filteredTypesToLooms[type] = [];
      }
    });

    if (loomians) {
      dispatch(setLoomians(loomians));
    }

    // const filteredTypesToMoves = {};
    // Object.keys(filterTypes).forEach((type) => {
    //   filteredTypesToMoves[type] = filterTypes[type].filter((move) =>
    //     allMoves.includes(move)
    //   );
    // });

    dispatch(setFilterTypesLoomians(filteredTypesToLooms));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Wrapper>
      <div className='box-container'>
        <div className={"box"}>
          <div className='type'>
            <div>Type</div>
            <p className={type.toLowerCase()}>
              <Link to={`/types/${type.toLowerCase()}`}>{type}</Link>
            </p>
          </div>
          <div className='category'>
            <div>Category</div>
            <p>{category}</p>
          </div>
          <div className='power'>
            <div>Strength</div>
            <p>{strength ? strength : "---"}</p>
          </div>
          <div className='accuracy'>
            <div>Accuracy</div>
            <p>
              {accuracy && typeof accuracy === "number"
                ? accuracy * 100
                : accuracy.length > 0
                ? accuracy
                : "---"}
            </p>
          </div>
          <div className='energy'>
            <div>Energy</div>
            <p>{energyCost}</p>
          </div>
          <div className='priority'>
            <div>Priority</div>
            <p>{priority}</p>
          </div>
        </div>
        <p className='description'>{description}</p>
      </div>
      <div className='title'>
        <Title className='small-title' title={"movesLoomians"}></Title>
      </div>
      {loomians ? (
        <>
          <div className='manip'>
            <LoomiansFilter></LoomiansFilter>
            <LoomiansSort></LoomiansSort>
            <Search searchType={"loom"}></Search>
          </div>
          <LoomiansList filtered_loomians={filtered_loomians}></LoomiansList>
        </>
      ) : (
        <div className='no-looms'>No Loomians can learn this move.</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .manip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;
  }
  .box {
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: 1rem 0;
    box-shadow: 2px 2px 10px 3px var(--abilityColor);
    width: 90vw;
    margin-right: auto;
    margin-left: auto;
    flex-wrap: wrap;
    background: var(--moveColor);
  }
  .type p {
    margin-top: 0.15rem;
    padding: 0.2rem 0.75rem;
    text-align: center;
    color: white;
    border-radius: 20px;
    width: 5rem;
  }
  .type,
  .category,
  .power,
  .accuracy,
  .energy,
  .priority {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    height: 3.25rem;
    width: auto;
  }

  .type,
  .category,
  .power,
  .accuracy,
  .energy,
  .priority {
    padding: 0.2rem 0.75rem;
  }

  .description {
    margin-top: 1rem;
    margin-right: auto;
    margin-left: auto;
    width: 90vw;
    line-height: 1.5;
  }
  a {
    color: white;
  }
  .no-looms {
    margin-top: 1rem;
    text-align: center;
  }
  @media (min-width: 992px) {
    height: auto;
    width: calc(100vw - 11rem);
    .manip {
      flex-direction: row;
      width: auto;
      justify-content: center;
      align-items: center;
      gap: 1.8rem;
    }
    .box {
      margin-right: auto;
      margin-left: auto;
      width: 45rem;
      padding: 1rem 1rem;
      gap: 2rem;
    }
    .box-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .type,
    .category,
    .power,
    .accuracy,
    .energy,
    .priority {
      width: 5.5rem;
    }
    .accuracy p {
      line-height: 1.2;
      text-align: center;
      margin: 0;
    }
    .description {
      margin-right: auto;
      margin-left: auto;
      width: 45rem;
      line-height: 1.5;
    }
    table {
      margin: auto;
    }
    .table-container {
      margin-top: 1rem;
      overflow-y: hidden;
    }
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }
`;

export default DisplayMove;
