import { Title, DisplayAbility, Genre } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const SingleAbility = () => {
  const navigate = useNavigate();
  const { genres, cachedAbilities, cachedAbilitiesLoomians } = useSelector(
    (state) => state.global
  );

  const { id } = useParams();
  const abilityLoomians = cachedAbilitiesLoomians;
  const abilities = cachedAbilities;

  const data = abilities[id.toLowerCase()];
  const loomians = abilityLoomians[id.toLowerCase()];

  if (data === undefined) {
    return navigate("/error");
  }

  return (
    <div>
      {data ? (
        <Wrapper>
          <Genre genres={genres}></Genre>
          <div className='title'>
            <Title title={id}></Title>
          </div>
          <DisplayAbility data={data} loomians={loomians}></DisplayAbility>
        </Wrapper>
      ) : (
        ""
      )}
    </div>
  );
};

const Wrapper = styled.div`
  @media (min-width: 996px) {
    width: calc(100vw - 11.1rem);
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }
`;

export default SingleAbility;
