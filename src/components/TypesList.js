import { styled } from "styled-components";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const TypesList = ({ types, dual }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let { id } = useParams();
  if (id) {
    id = id.toLowerCase();
  }
  let orderedTypes = [...types];
  orderedTypes.sort((a, b) => a.name.localeCompare(b.name));

  if (!dual && types) {
    return (
      <Wrapper>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th></th>
                {orderedTypes.map((item, index) => {
                  const { name } = item;
                  return (
                    <th key={item.name} className='column-head'>
                      <div>
                        <p className={`${name} type column`}>
                          {" "}
                          <Link to={`${name}`}>{name}</Link>
                        </p>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {orderedTypes.map((row, rowIndex) => {
                const { name, superEffective, notEffective, noEffect } = row;
                return (
                  <tr key={rowIndex} className='table-row'>
                    <th>
                      <p className={`${name} type row`}>
                        <Link to={`${name}`}>{name}</Link>
                      </p>
                    </th>
                    {orderedTypes.map((column, colIndex) => {
                      const { name: columnName } = column;
                      let value = 1;
                      superEffective.map((item) => {
                        if (item === columnName) {
                          value = 2;
                        }
                        return value;
                      });
                      notEffective.map((item) => {
                        if (item === columnName) {
                          value = 0.5;
                        }
                        return value;
                      });
                      noEffect.map((item) => {
                        if (item === columnName) {
                          value = 0;
                        }
                        return value;
                      });

                      return (
                        <td
                          key={colIndex}
                          className={`value ${
                            value === 2
                              ? "two"
                              : value === 1
                              ? "one"
                              : value === 0
                              ? "zero"
                              : "point-five"
                          }`}
                        >
                          {value}x
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
  if (dual && types) {
    return (
      <Wrapper>
        <div className='table-container dual'>
          <table>
            <thead>
              <tr>
                <th></th>
                {orderedTypes.map((item) => {
                  const { name } = item;
                  return (
                    <th key={item.name} className='column-head'>
                      <div>
                        <p className={`${name} type column`}>
                          {" "}
                          <Link to={`/types/${name}`}>{name}</Link>
                        </p>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {orderedTypes.map((row, rowIndex) => {
                const { name, resists, weakTo, immuneTo } = row;
                return (
                  <tr key={rowIndex} className='table-row'>
                    <th>
                      <p className={`${name} type row`}>
                        <Link to={`/types/${name}`}>{name}</Link>
                      </p>
                    </th>
                    {orderedTypes.map((column, colIndex) => {
                      const {
                        resists: cResists,
                        weakTo: cWeakTo,
                        immuneTo: cImmuneTo,
                      } = column;
                      let value = 1;
                      if (rowIndex !== colIndex) {
                        resists.map((item) => {
                          if (id === item) {
                            value = value / 2;
                          }
                          return value;
                        });
                        weakTo.map((item) => {
                          if (id === item) {
                            value = value * 2;
                          }
                          return value;
                        });
                        immuneTo.map((item) => {
                          if (id === item) {
                            value = 0;
                          }
                          return value;
                        });
                        cResists.map((item) => {
                          if (id === item) {
                            value = value / 2;
                          }
                          return value;
                        });
                        cWeakTo.map((item) => {
                          if (id === item) {
                            value = value * 2;
                          }
                          return value;
                        });
                        cImmuneTo.map((item) => {
                          if (id === item) {
                            value = 0;
                          }
                          return value;
                        });
                      } else {
                        resists.map((item) => {
                          if (id === item) {
                            value = value / 2;
                          }
                          return value;
                        });
                        weakTo.map((item) => {
                          if (id === item) {
                            value = value * 2;
                          }
                          return value;
                        });
                        immuneTo.map((item) => {
                          if (id === item) {
                            value = 0;
                          }
                          return value;
                        });
                      }

                      return (
                        <td
                          key={colIndex}
                          className={`value ${
                            value === 4
                              ? "four"
                              : value === 2
                              ? "two"
                              : value === 1
                              ? "one"
                              : value === 0.5
                              ? "point-five"
                              : value === 0.25
                              ? "point-two-five"
                              : value === 0
                              ? "zero"
                              : ""
                          }`}
                        >
                          {value}
                          {value ? "x" : ""}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;

  .four {
    background: #86efac;
  }
  .two {
    background: #22c55e;
  }
  .one {
    background: var(--backgroundColor);
  }
  .point-five {
    background: #f87171;
  }
  .point-two-five {
    background: #be123c;
  }
  .zero {
    background: #71717a;
  }
  .type.column {
    margin: 0.5rem;
  }
  .column-head > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 3.25rem;
  }
  th {
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: capitalize;
  }
  .table-container {
    overflow-x: auto;
  }
  .type {
    text-align: center;
    color: white;
    padding: 0.25rem 0.6rem;
    border-radius: 20px;
  }
  .type.row {
    margin-right: 1rem;
  }
  .type.column {
    writing-mode: vertical-rl;
    transform: rotate(225deg);
    white-space: nowrap;
    width: 1.5rem;
    height: 5rem;
    padding: 0.2rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
  table {
    border-collapse: collapse;
  }
  td {
    text-align: center;
    border: 2px solid gray;
  }
  .value {
    height: 2.2rem;
    width: 3rem;
  }
  a {
    color: white;
  }

  @media (min-width: 996px) {
    height: auto;
    width: auto;

    .table-container.dual {
      margin-left: 0rem;
    }

    .type.column {
      margin: 0rem;
    }

    table {
      margin: auto;
    }
    .table-container {
      overflow-y: hidden;
      margin-bottom: 1rem;
    }
    th.column-head {
      padding-bottom: 0.5rem;
    }
  }
`;

export default TypesList;
