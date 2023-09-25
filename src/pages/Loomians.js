import {
  Title,
  LoomiansList,
  LoomiansSort,
  LoomiansFilter,
  Genre,
  Search,
} from "../components";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterTypesLoomians,
  setLoomians,
  setMoves,
  setFilterTypes,
  setFilterCategories,
  setFilterTypeCategories,
} from "../features/globalSlice";
import { useEffect } from "react";
const Loomians = () => {
  const {
    genres,
    filtered_loomians,
    filterTypesLoomsBackup,
    backup_loomians,
    backup_moves,
    filterTypesBackup,
    filterCategoryBackup,
    filterTypeCategoryBackup,
  } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoomians(backup_loomians));
    dispatch(setFilterTypesLoomians(filterTypesLoomsBackup));
    dispatch(setMoves(backup_moves));
    dispatch(setFilterTypes(filterTypesBackup));
    dispatch(setFilterCategories(filterCategoryBackup));
    dispatch(setFilterTypeCategories(filterTypeCategoryBackup));
  }, [
    dispatch,
    backup_loomians,
    filterTypesLoomsBackup,
    backup_moves,
    filterTypesBackup,
    filterCategoryBackup,
    filterTypeCategoryBackup,
  ]);

  return (
    <Wrapper>
      <Genre genres={genres}></Genre>
      <div className='title'>
        <Title title={"Loomians"}></Title>
      </div>
      <div className='manip'>
        <LoomiansSort></LoomiansSort>
        <LoomiansFilter></LoomiansFilter>
        <Search searchType={"loom"}></Search>
      </div>
      <LoomiansList filtered_loomians={filtered_loomians}></LoomiansList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .manip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;
  }

  @media (min-width: 996px) {
    width: calc(100vw - 11rem);
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
    .manip {
      flex-direction: row;
      width: auto;
      justify-content: center;
      align-items: center;
      gap: 1.8rem;
    }
  }

  @media (min-width: 1400px) {
    .manip {
      flex-direction: row;
      width: auto;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default Loomians;
