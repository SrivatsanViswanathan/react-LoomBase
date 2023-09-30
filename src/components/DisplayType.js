import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TypesList from "./TypesList";
import Title from "./Title";
import LoomiansList from "./LoomiansList";
import { useEffect } from "react";
import { setLoomians, setLoomiansSort } from "../features/globalSlice";
import { useDispatch } from "react-redux";
const DisplayType = ({ data, loomians }) => {
  let { types } = useSelector((state) => state.global);

  const dispatch = useDispatch();
  useEffect(() => {
    if (loomians) {
      dispatch(setLoomians(loomians));
    }
    dispatch(setLoomiansSort("none", "none", "none", "none"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <Wrapper>
      <div className='affects'>
        <div className='offense'>
          <h4>Attack</h4>
          <div
            className={`effective ${
              data.superEffective.length === 0 ? "none" : ""
            }`}
          >
            <span>{data.name} moves are super effective against : </span>
            <div className='items'>
              {data.superEffective.map((item) => {
                return (
                  <div key={item} className={item}>
                    <Link to={`/types/${item}`}>{item}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`effective ${
              data.notEffective.length === 0 ? "none" : ""
            }`}
          >
            <span>{data.name} moves are not very effective against : </span>
            <div className='items'>
              {data.notEffective.map((item) => {
                return (
                  <div key={item} className={item}>
                    <Link to={`/types/${item}`}>{item}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`effective ${data.noEffect.length === 0 ? "none" : ""}`}
          >
            <span>{data.name} moves do nothing on : </span>
            <div className='items'>
              {data.noEffect.map((item) => {
                return (
                  <div key={item} className={item}>
                    <Link to={`/types/${item}`}>{item}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='defense'>
          <h4>Defense</h4>
          <div
            className={`effective ${data.immuneTo.length === 0 ? "none" : ""}`}
          >
            <span>
              {data.name} loomians are immune to moves from these types :{" "}
            </span>
            <div className='items'>
              {data.immuneTo.map((item) => {
                return (
                  <div key={item} className={item}>
                    <Link to={`/types/${item}`}>{item}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`effective ${data.resists.length === 0 ? "none" : ""}`}
          >
            <span>{data.name} loomians resist moves from these types : </span>
            <div className='items'>
              {data.resists.map((item) => {
                return (
                  <div key={item} className={item}>
                    <Link to={`/types/${item}`}>{item}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`effective ${data.weakTo.length === 0 ? "none" : ""}`}
          >
            <span>
              {data.name} loomians are weak to moves from these types :{" "}
            </span>
            <div className='items'>
              {data.weakTo.map((item) => {
                return (
                  <div key={item} className={item}>
                    <Link to={`/types/${item}`}>{item}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='dual-types'>
        <div className='title'>
          <Title title={"dual"}></Title>
        </div>
        <div className='dual-desc'>
          Power of <span>{data.name}</span> against every type combination.
        </div>
        <TypesList types={types} dual={true}></TypesList>
      </div>
      <div className='title'>
        <Title title={"movesLoomians"}></Title>
      </div>
      <div className='list-container'>
        <div className='list'>
          {loomians ? (
            <LoomiansList
              filtered_loomians={loomians}
              moves={true}
            ></LoomiansList>
          ) : (
            ""
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .affects {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .effective {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    overflow-x: auto;
  }
  .effective.none {
    display: none;
  }

  .offense,
  .defense {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  h4 {
    margin-bottom: 1rem;
  }
  span {
    margin-bottom: 1rem;
  }
  span:first-letter {
    text-transform: capitalize;
  }
  .effective > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
  }
  .effective > div > div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0rem 0.15rem;
    width: 5.5rem;
    height: 1.5rem;
    border-radius: 20px;
    text-transform: capitalize;
  }
  a {
    color: white;
  }
  .dual-desc {
    margin-bottom: 0.5rem;
  }
  .dual-desc::first-letter {
    text-transform: capitalize;
  }
  .dual-desc > span {
    text-transform: capitalize;
  }
  .dual-types {
    margin-top: 0.2rem;
    justify-content: center;
    text-align: center;
  }
  .items {
    display: flex;
    text-overflow: ellipsis;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    width: 96vw;
    overflow-x: auto;
  }

  @media (min-width: 992px) {
    width: auto;
    height: auto;
    justify-content: center;
    .items {
      display: flex;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: auto;
    }
    .effective > div > div {
      margin: 0rem 0.5rem;
    }
    .affects {
      margin-top: 3.5rem;
      display: flex;
      flex-direction: row;
      gap: 10rem;
      justify-content: center;
    }
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }
`;
export default DisplayType;
