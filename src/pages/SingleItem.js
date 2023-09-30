import { Title, DisplayItem, Genre } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const SingleItem = () => {
  const navigate = useNavigate();
  const { genres, cachedItems, cachedAbilitiesLoomians } = useSelector(
    (state) => state.global
  );

  const { id } = useParams();
  const abilityLoomians = cachedAbilitiesLoomians;
  const items = cachedItems;

  const data = items[id.toLowerCase()];
  const loomians = abilityLoomians[id.toLowerCase()];

  // useEffect(() => {
  //   const result = allItems.find((item) => {
  //     return item.name.toLowerCase() === id.toLowerCase();
  //   });

  //   if (!result) {
  //     return navigate("/error");
  //   }
  // }, []);

  if (data === undefined) {
    return navigate("/error");
  }

  return (
    <Wrapper>
      {data ? (
        <>
          <Genre genres={genres}></Genre>
          <div className='title'>
            <Title title={id}></Title>
          </div>
          <DisplayItem data={data} loomians={loomians}></DisplayItem>
        </>
      ) : (
        ""
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  @media (min-width: 996px) {
    width: 100%;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }
`;
export default SingleItem;
