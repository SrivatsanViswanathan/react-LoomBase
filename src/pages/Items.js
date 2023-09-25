import { useSelector } from "react-redux";
import { Title, ItemsList, Genre } from "../components";
import { styled } from "styled-components";

const Items = () => {
  const { genres } = useSelector((state) => state.global);
  return (
    <Wrapper>
      <Genre genres={genres}></Genre>
      <div className='title'>
        <Title title={"Items"}></Title>
      </div>
      <ItemsList></ItemsList>
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

export default Items;
