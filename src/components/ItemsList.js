import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ItemsList = () => {
  let { filtered_items } = useSelector((state) => state.global);
  const screenWidth = window.innerWidth;

  let items = filtered_items;

  items = [...items].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return (
    <Wrapper>
      <div className='table-container'>
        <table>
          <tbody>
            {items.map((item, index) => {
              const { name, description } = item;
              return (
                <tr key={index} className='items'>
                  <td className='name'>
                    <p>
                      <Link to={`/items/${name.toLowerCase()}`}>{name}</Link>
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
  .items {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    min-height: 3rem;
  }
  .items .name {
    width: 11rem;
    background: var(--statHighlight);
    padding: 0.35rem;
    display: flex;
    justify-content: center;
  }
  .items .name a {
    color: var(--textColor);
  }
  .items .name a:hover {
    border-bottom: 1px solid var(--textColor);
  }
  .items .description {
    width: 50rem;
    line-height: 1.5;
  }
  .table-container {
    overflow-x: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    min-height: calc(100vh - 6rem);
    width: auto;
    justify-content: center;
    table {
      margin: auto;
    }
  }
`;
export default ItemsList;
