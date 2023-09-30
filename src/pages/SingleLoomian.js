import { DisplayLoomian, Genre } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
const SingleLoomian = () => {
  const navigate = useNavigate();
  const { genres, cachedLoomians } = useSelector((state) => state.global);

  const { id } = useParams();

  const loomiansHashmap = cachedLoomians;

  const data = loomiansHashmap[id.toLowerCase()];

  if (data === undefined) {
    return navigate("/error");
  }

  return (
    <Wrapper>
      {data ? (
        <div>
          <Genre genres={genres}></Genre>
          <DisplayLoomian data={data}></DisplayLoomian>
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
  width: 100%;
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

export default SingleLoomian;
