import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AbilitiesList = () => {
  let { filtered_abilities } = useSelector((state) => state.global);
  let abilities = filtered_abilities;
  const screenWidth = window.innerWidth;

  abilities = [...abilities].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return (
    <Wrapper>
      <div className='table-container'>
        <table>
          <tbody>
            {abilities.map((item, index) => {
              const { name, description } = item;
              const isEvenRow = index % 2 === 0;

              return (
                <tr
                  key={index}
                  className={`abilities ${isEvenRow ? "even-row" : "odd-row"}`}
                >
                  <td className='name'>
                    <p>
                      <Link to={`/abilities/${name.toLowerCase()}`}>
                        {name}
                      </Link>
                    </p>
                  </td>
                  {screenWidth > 720 ? (
                    <>
                      <td className='description'>
                        <p>{description}</p>
                      </td>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  .abilities {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    min-height: 3rem;
  }
  .abilities .name {
    width: 11rem;
    padding: 0.35rem;
    display: flex;
    justify-content: center;
    background: var(--statHighlight);
  }
  .abilities .name a {
    color: var(--textColor);
  }
  .abilities .name a:hover {
    border-bottom: 1px solid var(--textColor);
  }
  .abilities .description {
    width: 50rem;
    line-height: 1.5;
  }
  .table-container {
    overflow-x: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  tr {
    margin-top: 1rem;
  }

  @media (min-width: 720px) {
    .table-container {
      display: block;
      margin-top: 1rem;
      overflow-y: hidden;
    }
  }

  @media (min-width: 992px) {
    min-height: calc(100vh - 10rem);
    width: auto;
    justify-content: center;
    .abilities {
      gap: 2rem;
      width: auto;
    }
    table {
      margin: auto;
    }
  }
`;

export default AbilitiesList;
