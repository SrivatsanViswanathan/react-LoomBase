import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { links } from "../data/links";
import { openLinks, closeLinks } from "../features/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
library.add(faBars);

const Navbar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.global.isOpen);

  return (
    <Wrapper $isOpen={isOpen} as='nav'>
      <div className='nav'>
        <div className='nav-header'>
          <div className='nav-logo'>
            <h2>LoomiBase</h2>
          </div>
          <div className='nav-buttons'>
            <ThemeToggle></ThemeToggle>
            <button
              type='button'
              className='nav-toggle'
              onClick={
                isOpen
                  ? () => dispatch(closeLinks())
                  : () => dispatch(openLinks())
              }
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
        <ul className={isOpen ? "nav-links active" : "nav-links"}>
          {/* <li onClick={() => dispatch(closeLinks())}>
            <a href='#'>Search</a>
          </li> */}
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id} onClick={() => dispatch(closeLinks())}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.nav`
  background: #15803d;
  padding: 1rem;
  min-height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav {
    width: 90vw;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    max-width: var(--max-width);
  }
  .bar {
    width: 30px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    border-radius: 2px;
    transition: 0.4s;
  }
  .nav-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;

    .nav-buttons {
      gap: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .nav-toggle {
    color: white;
    background: transparent;
    border: transparent;
    cursor: pointer;
    svg {
      font-size: 1.8rem;
    }
    transition: transform 0.3s ease-in-out;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  }
  .nav-links {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out,
      margin-top 0.5s ease-in-out;
    a {
      display: flex;
      padding: 0.3rem 0;
      width: 100%;
      color: white;
      text-transform: capitalize;
    }
  }
  .nav-links.active {
    margin-top: 1rem;
    opacity: 1;
    max-height: 20rem;
  }
  @media (min-width: 992px) {
    position: sticky;
    padding: 1rem;
    width: 10rem;
    height: 100vh;
    top: 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: 5px 0px 5px var(--textColor);

    .nav {
      width: 100%;
      height: 100%;
      display: flex;
      margin: 0 auto;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
    }
    .nav-toggle {
      display: none;
    }
    .nav-logo {
      width: 15rem;
      text-align: center;
    }
    .nav-logo h2 {
      font-size: 1.6rem;
      display: inline-block;
      width: 100%;
      text-align: center;
    }
    .nav-buttons {
      position: absolute;
      bottom: 0;
      left: 0;
      margin-left: 2.5rem;
      margin-bottom: 1.5rem;
    }
    .nav-links,
    .nav-links.active {
      opacity: 1;
      min-height: 75vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      width: 100%;
      a {
        display: inline;
        width: auto;
        height: auto;
        color: white;
        text-transform: capitalize;
        border-bottom: 1px solid transparent;
      }
      a:hover {
        border-bottom: 1px solid white;
      }
      li {
        padding: 1rem;
        width: 100%;
      }
    }
  }
`;
