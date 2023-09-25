import { Title, AbilitiesList, Genre } from "../components";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

const Abilities = () => {
  const { genres } = useSelector((state) => state.global);
  return (
    <Wrapper>
      <Genre genres={genres}></Genre>
      <div className='title'>
        <Title title={"Abilities"}></Title>
      </div>
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
