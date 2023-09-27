import { styled } from "styled-components";
import { setMovesSort, setMovesFilter } from "../features/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
const MovesSort = () => {
  const { movesSort, moves } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setMovesSort({ select: "name-a", moves }));
    };
  }, [dispatch, moves]);

  const handleMovesSortChange = (e) => {
    const select = e.target.value;
    dispatch(setMovesSort({ select, moves }));
  };

  useEffect(() => {
    dispatch(
      setMovesFilter({
        category: "all",
        type: "all",
      })
    );
  }, [dispatch]);

  return (
    <Wrapper>
      <div className='content'>
        <form>
          <label htmlFor='sort'>Sort by</label>
          <select
            name='sort'
            id='sort'
            className='sort-input'
            value={movesSort}
            onChange={handleMovesSortChange}
          >
            <option value='name-a'>name (a-z)</option>
            <option value='name-z'>name (z-a)</option>
            <option value='strength'>strength</option>
            <option value='accuracy'>accuracy</option>
            <option value='energy'>energy</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  form {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  label {
    display: inline-block;
  }
  form > div {
    display: flex;
    align-items: center;
  }
  select,
  option {
    text-align: center;
    width: 100%;
  }
  option {
    background: var(--statHighlight);
    color: var(--textColor);
    text-transform: capitalize;
  }
  select {
    width: 6.5rem;
    height: 1.3rem;
    border: none;
    border-radius: 10px;
    appearance: none;
    cursor: pointer;
    text-transform: capitalize;
    background: var(--statHighlight);
    color: var(--textColor);
  }

  select:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
  @media (min-width: 992px) {
    .moves {
      gap: 2rem;
    }
    table {
      margin: auto;
    }
    .table-container {
      margin-top: 1rem;
      overflow-y: hidden;
    }
  }
`;
export default MovesSort;
