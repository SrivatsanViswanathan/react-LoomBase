import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { setGenre } from "../features/globalSlice";
import { useSelector } from "react-redux";
const Genre = ({ genres }) => {
  const { genre } = useSelector((state) => state.global);

  const dispatch = useDispatch();
  return (
    <Wrapper>
      {genres.map((item) => {
        const { name } = item;
        return (
          <div key={name}>
            <button
              disabled={name === genre ? true : false}
              onClick={() => dispatch(setGenre(name))}
              style={
                name === genre
                  ? { borderBottom: "1px solid var(--textColor)" }
                  : { borderBottom: "transparent" }
              }
            >
              {name}
            </button>
            <span> / </span>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-top: 1rem;
  text-transform: capitalize;
  button {
    color: var(--textColor);
    border: transparent;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    background: transparent;
    text-transform: capitalize;
  }
  button:hover {
    border-bottom: 1px solid var(--textColor);
  }
  @media (min-width: 992px) {
    width: auto;
    table {
      margin: auto;
    }
    .table-container {
      margin-top: 1rem;
      overflow-y: hidden;
    }
  }
`;
export default Genre;
