import { styled } from "styled-components";
import { setLoomiansFilter } from "../features/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
const LoomiansFilter = () => {
  const {
    category,
    types,
    loomiansType,
    loomiansType2,
    loomiansSort,
    loomiansSort2,
    text,
  } = useSelector((state) => state.global);

  const orderedTypes = [...types];

  orderedTypes.sort((a, b) => {
    // Use the localeCompare() method to perform a case-insensitive string comparison
    return a.name.localeCompare(b.name);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setLoomiansFilter({
        type: "all",
        type2: "all",
        sort: "none",
        sort2: "none",
        text: "",
      })
    );
  }, [dispatch]);

  const handleTypesChange = (e) => {
    const type = e.target.value;

    dispatch(
      setLoomiansFilter({
        category,
        type,
        type2: loomiansType2,
        sort: loomiansSort,
        sort2: loomiansSort2,
        text,
      })
    );
  };
  const handleTypes2Change = (e) => {
    const type2 = e.target.value;

    dispatch(
      setLoomiansFilter({
        category,
        type: loomiansType,
        type2,
        sort: loomiansSort,
        sort2: loomiansSort2,
        text,
      })
    );
  };
  return (
    <Wrapper>
      <div className='content'>
        <form>
          <div>
            <label htmlFor='type'>Type 1 </label>
            <select
              name='type'
              id='type'
              className='type-input'
              value={loomiansType}
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
            </select>
          </div>
          <div>
            <label htmlFor='type2'>Type 2 </label>
            <select
              name='type2'
              id='type2'
              className='type2-input'
              value={loomiansType2}
              onChange={handleTypes2Change}
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
  justify-content: center;
  form {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  form > div {
    display: flex;
    align-items: center;
  }
  label {
    display: inline-block;
    margin-right: 0.5rem;
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
    form {
      justify-content: space-between;
    }
  }
`;
export default LoomiansFilter;
