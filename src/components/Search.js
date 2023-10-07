import { styled } from "styled-components";
import { setLoomiansFilter, setMovesFilter, setAbilitiesFilter, setItemsFilter } from "../features/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Search = ({ searchType }) => {
  const {
    category,
    types,
    loomiansType,
    loomiansType2,
    loomiansSort,
    loomiansSort2,
    text,
    type,
  } = useSelector((state) => state.global);

  let orderedTypes = [...types];

  orderedTypes.sort((a, b) => {
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

  const handleTextChangeLooms = (e) => {
    const newText = e.target.value;

    dispatch(
      setLoomiansFilter({
        category: category,
        type: loomiansType,
        type2: loomiansType2,
        sort: loomiansSort,
        sort2: loomiansSort2,
        text: newText,
      })
    );
  };

  const handleTextChangeMoves = (e) => {
    const newText = e.target.value;

    dispatch(
      setMovesFilter({
        category: category,
        type: type,
        text: newText,
      })
    );
  };

  const handleTextChangeAbilities = (e) => {
    const newText = e.target.value;

    dispatch(
      setAbilitiesFilter({
        text: newText,
      })
    );
  };

  const handleTextChangeItems = (e) => {
    const newText = e.target.value;

    dispatch(
      setItemsFilter({
        text: newText,
      })
    );
  };

  return (
    <Wrapper>
      <div className='content'>
        <form>
          <div>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              autoComplete='off'
              value={text}
              onChange={
                searchType === "loom" ? 
                handleTextChangeLooms 
                : searchType === "moves" 
                ? handleTextChangeMoves 
                : searchType === "abilities" 
                ? handleTextChangeAbilities 
                : searchType === "items"
                ? handleTextChangeItems
                : ""
              }
            />
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
  label {
    display: inline-block;
    margin-right: 0.5rem;
  }
  option {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--statHighlight);
    color: var(--textColor);
    text-transform: capitalize;
    text-align: center;
  }
  .search-input {
    border: transparent;
    border-bottom: 2px solid var(--textColor);
    background: none;
    text-align: center;
    text-transform: capitalize;
    color: var(--textColor);
  }

  input:focus {
    outline: none;
  }
  @media (min-width: 992px) {
    form {
      justify-content: space-between;
    }
  }
`;
export default Search;
