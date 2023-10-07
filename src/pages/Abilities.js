import { useEffect } from "react";
import { Title, AbilitiesList, Genre, Search } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import {setAbilities} from "../features/globalSlice";

const Abilities = () => {
  const { genres, abilities } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAbilities(abilities))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  return (
    <Wrapper>
      <Genre genres={genres}></Genre>
      <div className='title'>
        <Title title={"Abilities"}></Title>
      </div>
      <Search searchType={"abilities"}></Search>
      <AbilitiesList></AbilitiesList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (min-width: 996px) {
    width: calc(100vw - 11rem);
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }
`;
export default Abilities;
