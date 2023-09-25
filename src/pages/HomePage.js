import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const HomePage = () => {
  return (
    <Wrapper>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;
export default HomePage;
