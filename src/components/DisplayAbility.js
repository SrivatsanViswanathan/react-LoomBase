import { styled } from "styled-components";
import Title from "./Title";
import LoomiansList from "./LoomiansList";
import { useEffect } from "react";
import LoomiansFilter from "./LoomiansFilter";
import LoomiansSort from "./LoomiansSort";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { setLoomians, setFilterTypesLoomians } from "../features/globalSlice";
const DisplayAbility = ({ data, loomians }) => {
  const dispatch = useDispatch();
  const { filtered_loomians, filterTypesLooms } = useSelector(
    (state) => state.global
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (loomians) {
      dispatch(setLoomians(loomians));
    }

    const filteredTypesToLooms = {};

    Object.keys(filterTypesLooms).forEach((type) => {
      filteredTypesToLooms[type] = filterTypesLooms[type].filter((loom) => {
        return loomians.includes(loom);
      });
    });

    dispatch(setFilterTypesLoomians(filteredTypesToLooms));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const { description } = data;
  return (
    <Wrapper>
      <p className='description'>{description}</p>
      <div className='title'>
        <Title title={"abilityLoomians"}></Title>
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
        <div className='none'>No Loomians have this ability.</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .description {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    line-height: 1.5;
  }
  .none {
    margin-right: auto;
    margin-left: auto;
    margin-top: 1rem;
  }
  .manip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;
  }
  @media (min-width: 992px) {
    height: auto;
    max-width: calc(100vw - 11rem);
    .manip {
      flex-direction: row;
      width: auto;
      justify-content: center;
      align-items: center;
      gap: 1.8rem;
    }
    .description {
      margin-top: 1rem;
      margin-right: auto;
      margin-left: auto;
      width: 55rem;
      line-height: 1.5;
      text-align: center;
    }
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }
`;
export default DisplayAbility;
