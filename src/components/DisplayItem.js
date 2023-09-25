import { styled } from "styled-components";
import Title from "./Title";
import LoomiansList from "./LoomiansList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const DisplayItem = ({ data }) => {
  const { sets, cachedLoomians } = useSelector((state) => state.global);
  const { description } = data;
  const { id } = useParams();

  let looms = [];

  sets.forEach((item) => {
    if (item.sets) {
      item.sets.forEach((stuff) => {
        stuff.items.forEach((loomItem) => {
          if (loomItem.toLowerCase() === id.toLowerCase()) {
            looms.push(cachedLoomians[item.name]);
          }
        });
      });
    }
  });

  return (
    <Wrapper>
      <p className='description'>{description}</p>
      <div className='title'>
        <Title title={"abilityLoomians"}></Title>
      </div>
      {looms.length > 0 ? (
        <LoomiansList filtered_loomians={looms[0]} moves={true}></LoomiansList>
      ) : (
        <div className='none'>No Loomians have this item in their sets.</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: auto;
  .description {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  .none {
    margin-right: auto;
    margin-left: auto;
    margin-top: 1rem;
  }
  @media (min-width: 992px) {
    height: auto;
    width: calc(100vw - 11rem);
    .description {
      margin-top: 1rem;
      margin-right: auto;
      margin-left: auto;
      width: 55rem;
      line-height: 1.5;
      text-align: center;
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }
`;
export default DisplayItem;
