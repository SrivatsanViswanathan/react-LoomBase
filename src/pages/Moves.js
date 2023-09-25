import {
  Title,
  MovesList,
  MovesSort,
  MovesFilter,
  Genre,
  Search,
} from "../components";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterCategories,
  setFilterTypeCategories,
  setFilterTypes,
  setMoves,
} from "../features/globalSlice";
import { useEffect } from "react";
const Moves = () => {
  const { genres, filtered_moves } = useSelector((state) => state.global);
  const {
    backup_moves,
    filterTypesBackup,
    filterCategoryBackup,
    filterTypeCategoryBackup,
  } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMoves(backup_moves));
    dispatch(setFilterTypes(filterTypesBackup));
    dispatch(setFilterCategories(filterCategoryBackup));
    dispatch(setFilterTypeCategories(filterTypeCategoryBackup));
  }, [
    dispatch,
    backup_moves,
    filterTypesBackup,
    filterCategoryBackup,
    filterTypeCategoryBackup,
  ]);
  return (
    <Wrapper>
      <Genre genres={genres}></Genre>
      <div className='title'>
        <Title title={"Moves"}></Title>
      </div>
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
      <MovesList filtered_moves={filtered_moves}></MovesList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .manip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    gap: 1rem;
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
    .filter {
      justify-content: flex-start;
    }
  }

  @media (min-width: 1400px) {
    .manip {
      flex-direction: row;
      width: auto;
    }
  }
`;
export default Moves;
