import { Title } from "../components";
import { styled } from "styled-components";

const Contact = () => {
  return (
    <Wrapper>
      <div className='title'>
        <Title title={"Contact Us"}></Title>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: auto;
  width: calc(100vw - 11rem);
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
  }
`;
export default Contact;
