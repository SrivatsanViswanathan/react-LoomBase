import { styled } from "styled-components";

const Title = ({ title }) => {
  if (title === "movesLoomians" || title === "abilityLoomians") {
    return (
      <Wrapper>
        <div className='small-title' style={{ marginTop: "1.5rem" }}>
          <h4>Loomians</h4>
          <div className='title-underline'></div>
        </div>
      </Wrapper>
    );
  }
  if (title === "dual") {
    return (
      <Wrapper>
        <div className='small-title'>
          <h4>Dual Types</h4>
          <div className='title-underline'></div>
        </div>
      </Wrapper>
    );
  }
  if (title === "moves") {
    return (
      <Wrapper>
        <div className='small-title'>
          <h4>Moves</h4>
          <div className='title-underline'></div>
        </div>
      </Wrapper>
    );
  }
  if (title !== "movesLoomians") {
    return (
      <Wrapper>
        <div className='big-title'>
          <h2>{title}</h2>
          <div className='title-underline'></div>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  .title-underline {
    width: 70%;
  }
  @media (min-width: 992px) {
    width: auto;
    height: 6rem;

    .title-underline {
      width: 100%;
    }
  }
`;
export default Title;
