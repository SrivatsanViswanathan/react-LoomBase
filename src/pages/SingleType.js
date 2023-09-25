import { DisplayType, Title, Genre } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilterTypesLoomians } from "../features/globalSlice";
const SingleType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { cachedTypes, filterTypesLooms, genres, filterTypesLoomsBackup } =
    useSelector((state) => state.global);

  useEffect(() => {
    dispatch(setFilterTypesLoomians(filterTypesLoomsBackup));
  }, [dispatch, filterTypesLoomsBackup]);

  const { id } = useParams();
  const types = cachedTypes;
  const typesToLoomians = filterTypesLooms;

  const loomians = typesToLoomians[id.toLowerCase()];

  const data = types[id.toLowerCase()];

  if (data === undefined) {
    return navigate("/error");
  }

  // useEffect(() => {
  //   const result = allTypes.find((item) => {
  //     return item.name.toLowerCase() === id.toLowerCase();
  //   });

  //   if (!result) {
  //     return navigate("/error");
  //   }
  // }, []);

  return (
    <Wrapper>
      {data ? (
        <div>
          <Genre genres={genres}></Genre>
          <div className='title'>
            <Title title={id}></Title>
          </div>
          <DisplayType data={data} loomians={loomians}></DisplayType>
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
  width: auto;

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
export default SingleType;
