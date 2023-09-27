import { styled } from "styled-components";
import { setLoomiansSort } from "../features/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const LoomiansSort = () => {
  const { loomiansSort, loomiansSort2, loomiansType, loomiansType2 } =
    useSelector((state) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setLoomiansSort({
        sort: "none",
        sort2: "none",
        loomiansType: "all",
        loomiansType2: "all",
      })
    );
  }, [dispatch]);

  const handleMovesSortChange = (e) => {
    const sort = e.target.value;

    dispatch(
      setLoomiansSort({
        sort,
        sort2: loomiansSort2,
        loomiansType,
        loomiansType2,
      })
    );
  };
  const handleMovesSortChange2 = (e) => {
    const sort2 = e.target.value;

    dispatch(
      setLoomiansSort({
        sort: loomiansSort,
        sort2,
        loomiansType,
        loomiansType2,
      })
    );
  };

  return (
    <Wrapper>
      <div className='content'>
        <form>
          <div>
            <label htmlFor='sort'>Stat 1 </label>
            <select
              name='sort'
              id='sort'
              className='sort-input'
              value={loomiansSort}
              onChange={handleMovesSortChange}
            >
              <option value='none'>none</option>
              <option value='hp'>hp</option>
              <option value='energy'>energy</option>
              <option value='meleeAttack'>melee attack</option>
              <option value='meleeDefense'>melee defense</option>
              <option value='rangedAttack'>ranged attack</option>
              <option value='rangedDefense'>ranged defense</option>
              <option value='speed'>speed</option>
            </select>
          </div>
          <div>
            <label htmlFor='sort2'>Stat 2 </label>
            <select
              name='sort2'
              id='sort2'
              className='sort2-input'
              value={loomiansSort2}
              onChange={handleMovesSortChange2}
            >
              <option value='none'>none</option>
              <option value='hp'>hp</option>
              <option value='energy'>energy</option>
              <option value='meleeAttack'>melee attack</option>
              <option value='meleeDefense'>melee defense</option>
              <option value='rangedAttack'>ranged attack</option>
              <option value='rangedDefense'>ranged defense</option>
              <option value='speed'>speed</option>
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
export default LoomiansSort;
