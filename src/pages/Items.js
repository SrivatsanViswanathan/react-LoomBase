import { useSelector, useDispatch } from "react-redux";
import { Title, ItemsList, Genre, Search } from "../components";
import { styled } from "styled-components";
import { setItems } from "../features/globalSlice";
import { useEffect } from "react";

const Items = () => {
  const { genres, items } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setItems(items))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  return (
    <Wrapper>
      <Genre genres={genres}></Genre>
      <div className='title'>
        <Title title={"Items"}></Title>
      </div>
      <Search searchType={"items"}></Search>
      <ItemsList></ItemsList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (min-width: 996px) {
    width: calc(100vw - 11rem);
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }
`;

export default Items;
