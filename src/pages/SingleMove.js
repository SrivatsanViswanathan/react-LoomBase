import { DisplayMove, Genre, Title } from "../components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

const SingleMove = () => {
  const { genres, cachedMoves, cachedMovesLoomians } = useSelector(
    (state) => state.global
  );
  const navigate = useNavigate();

  const { id } = useParams();
  const moves = cachedMoves;
  const movesToLoomiansMap = cachedMovesLoomians;

  const loomians = movesToLoomiansMap[id.toLowerCase()];
  const data = moves[id.toLowerCase()];

  // useEffect(() => {
  //   const result = allMoves.find((item) => {
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
        <div>
          <Genre genres={genres}></Genre>
          <div className='title'>
            <Title title={id}></Title>
          </div>
          <DisplayMove data={data} loomians={loomians}></DisplayMove>
        </div>
      ) : (
        ""
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export default SingleMove;
