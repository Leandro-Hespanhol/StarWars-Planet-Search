import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import FetchAPIPlanets from '../hooks/usePlanetHook';

export default function PlanetProvider({ children }) {
  const [planets, allPlanets, setAllPlanets] = FetchAPIPlanets();

  const [nameInput, setNameInput] = useState([allPlanets]);
  const [classification, setClassification] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period',
      'surface_water'],
  );

  const [comparisson, setComparisson] = useState([
    'maior que', 'menor que', 'igual a',
  ]);

  const [columnCompValue, setColumnCompValue] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [filterValues, setFilterValues] = useState({
    filterByNumericValues: [],
  });

  function onInputChange({ target }) {
    setNameInput(target.value);
  }

  useEffect(() => {
    setColumnCompValue({
      ...columnCompValue,
      column: classification[0],
    });
  }, [classification]);

  useEffect(() => {
    setAllPlanets(planets.filter((planetName) => planetName.name.includes(nameInput)));
  }, [nameInput]);

  const onClassifcChange = ({ target }) => {
    const { value, name } = target;
    setColumnCompValue({
      ...columnCompValue,
      [name]: value,
    });
  };

  function filteredByClassification() {
    return filterValues.filterByNumericValues
      .forEach(({ comparison, column, value }) => {
        const filters = allPlanets
          .filter((planet) => {
            switch (comparison) {
            case 'menor que':
              return Number(planet[column]) < Number(value);
            case 'maior que':
              return Number(planet[column]) > Number(value);
            case 'igual a':
              return Number(planet[column]) === Number(value);
            default:
              return [];
            }
          });
        setAllPlanets(filters);
      });
  }

  useEffect(() => {
    filteredByClassification();
  }, [filterValues]);

  function deleteFilteredButton({ target }) {
    const deleteHere = filterValues.filterByNumericValues
      .find((elem) => elem.column === target.parentNode.parentNode.id);

    setFilterValues({
      ...filterValues,
      filterByNumericValues: [
        ...filterValues.filterByNumericValues
          .filter((elem) => elem !== deleteHere),
      ],
    });
    setAllPlanets(planets);
    setClassification([...classification, target.parentNode.parentNode.id]);
  }

  const [orderBy, setOrderBy] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  const [columnClassf, setColumnClassf] = useState('');

  function onOrderFilterChange({ target }) {
    setColumnClassf(target.value);
    setOrderBy({
      ...orderBy,
      order: {
        ...orderBy.order,
        column: target.value,
      },
    });
  }

  const [ascDesc, setAscDesc] = useState('ASC');

  function sortFilter({ target }) {
    setAscDesc(target.id);
    setOrderBy({
      ...orderBy,
      order: {
        ...orderBy.order,
        sort: target.id,
      },
    });
    const planetsSorted = allPlanets.sort((a, b) => {
      if (orderBy.order.sort === 'ASC') {
        if (a[orderBy.order.column] >= b[orderBy.order.column]) {
          return 1;
        }
        return +'-1';
      }
      return +'-1';
    });

    setAllPlanets(planetsSorted);
  }

  const [planetsOrderFilter, setPlanetsOrderFilter] = useState([]);
  const [clickCounter, setClickCounter] = useState(0);

  function buttonSortByOrder() {
    let planetsSorted = [];
    if (orderBy.order.sort === 'ASC') {
      planetsSorted = allPlanets
        .sort((a, b) => a[orderBy.order.column] - b[orderBy.order.column]);
    }
    if (orderBy.order.sort === 'DESC') {
      planetsSorted = allPlanets
        .sort((a, b) => b[orderBy.order.column] - a[orderBy.order.column]);
    }

    setPlanetsOrderFilter(planetsSorted);
    setClickCounter(clickCounter + 1);
    console.log('buttonSort', planetsOrderFilter);
  }

  useEffect(() => {
    setAllPlanets(planetsOrderFilter);
  }, [clickCounter]);

  function createDeleteButton() {
    return (
      <div>
        {filterValues.filterByNumericValues.map((elem) => (
          <div key={ elem.column } id={ elem.column }>
            <label htmlFor="deleteButton" data-testid="filter">
              <span>{elem.column}</span>
              <span>{elem.comparison}</span>
              <span>{elem.value}</span>
              <button
                type="button"
                name="button"
                id="deleteButton"
                onClick={ (event) => deleteFilteredButton(event) }
              >
                X
              </button>
            </label>
          </div>
        ))}
      </div>
    );
  }

  function onButtonFilter() {
    setFilterValues({
      ...filterValues,
      filterByNumericValues: [
        ...filterValues.filterByNumericValues, columnCompValue,
      ],
    });
    setClassification([
      ...classification.filter((columnClass) => columnClass !== columnCompValue.column),
    ]);

    createDeleteButton();
  }

  const contextValue = {
    planets,
    onInputChange,
    onClassifcChange,
    filteredByClassification,
    classification,
    setClassification,
    setColumnCompValue,
    columnCompValue,
    onButtonFilter,
    comparisson,
    setComparisson,
    filterValues,
    allPlanets,
    createDeleteButton,
    onOrderFilterChange,
    columnClassf,
    sortFilter,
    ascDesc,
    buttonSortByOrder,
    filterByName: {
      name: nameInput,
    },
  };

  return (
    <div>
      <PlanetContext.Provider value={ contextValue }>
        { children }
      </PlanetContext.Provider>
    </div>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
