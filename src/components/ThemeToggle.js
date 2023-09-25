import { styled } from "styled-components";
import { darkTheme } from "../features/globalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
library.add(faSun, faMoon);

// const getInitialDarkMode = () => {
//   const prefersDarkMode = window.matchMedia(
//     "(prefers-color-scheme:dark)"
//   ).matches;
//   const storedDarkMode = localStorage.getItem("darkTheme") === "true";
//   return storedDarkMode || prefersDarkMode;
// };

const ThemeToggle = () => {
  const { isDarkTheme } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  // const toggleDarkTheme = () => {
  //   const newDarkTheme = !isDarkTheme;
  //   setIsDarkTheme(newDarkTheme);
  //   localStorage.setItem("darkTheme", newDarkTheme);
  // };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <Wrapper>
      <section className='toggle-container'>
        <button className='dark-toggle' onClick={() => dispatch(darkTheme())}>
          {isDarkTheme ? (
            <FontAwesomeIcon className='toggle-icon' icon={faSun} />
          ) : (
            <FontAwesomeIcon className='toggle-icon' icon={faMoon} />
          )}
        </button>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .toggle-container {
    padding: 1rem 0;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
  }
  .dark-toggle {
    background: transparent;
    border-color: transparent;
    width: 5rem;
    height: 2rem;
    display: grid;
    place-items: center;
    cursor: pointer;
  }

  .toggle-icon {
    font-size: 1.5rem;
    color: var(--textColor);
  }
  @media (min-width: 992px) {
    height: 3rem;
  }
`;
export default ThemeToggle;
