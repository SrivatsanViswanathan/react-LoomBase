import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404 Error: Page Does Not Exist</h1>
      </div>
      <Link to='/' className='btn'>
        Back Home
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  h1 {
    font-size: 3rem;
    text-align: center;
  }
  height: calc(100vh - 6rem);
  width: 100%;
  @media (min-width: 992px) {
    width: calc(100vw - 10rem);
    text-align: center;
    height: 100vh;
  }
`;
export default Error;
