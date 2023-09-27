import { styled } from "styled-components";
import { setMovesFilter } from "../features/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const MovesFilter = () => {
  const { category, type, types, text } = useSelector((state) => state.global);

  const orderedTypes = [...types];

  orderedTypes.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const dispatch = useDispatch();

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;

    dispatch(setMovesFilter({ category: newCategory, type, text }));
  };
  const handleTypesChange = (e) => {
    const newType = e.target.value;
    console.log(newType);

    dispatch(setMovesFilter({ category, type: newType, text }));
  };

  useEffect(() => {
    console.log(type);
    dispatch(
      setMovesFilter({
        category: "all",
        type: "all",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Wrapper>
      <div className='content'>
        <form>
          <div>
            <label htmlFor='type'>Type </label>
            <select
              name='type'
              id='type'
              className='type-input'
              value={type}
              onChange={handleTypesChange}
            >
              <option value='all'>all</option>
              {orderedTypes.map((item) => {
                const { name } = item;
                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
              <option value='various'>various</option>
            </select>
          </div>
          <div>
            <label htmlFor='category'>Category </label>
            <select
              name='category'
              id='category'
              className='category-input'
              value={category}
              onChange={handleCategoryChange}
            >
              <option value='all'>all</option>
              <option value='melee'>melee</option>
              <option value='ranged'>ranged</option>
              <option value='support'>support</option>
            </select>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  form {
    display: flex;
    gap: 1.5rem;
  }
  form > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  select,
  option {
    text-align: center;
    width: 100%;
    text-align-last: center;
  }
  option {
    background: var(--statHighlight);
    color: var(--textColor);
    text-transform: capitalize;
    margin-right: 4rem;
    border: 5px solid black;
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
`;
export default MovesFilter;
