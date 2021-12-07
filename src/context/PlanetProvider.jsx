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

  // console.log('classific', filterValues);

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

    console.log('deleteHere', deleteHere);
    // console.log('filteredByClassification', filteredByClassification);
    console.log('allPlanets', allPlanets);
    // console.log('filterByNumericValues', filterValues.filterByNumericValues);
    // console.log('classification', classification);
  }

  // useEffect(() => {
  //   setAllPlanets(filteredByClassification);
  // }, [filterValues]);

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
    // filteredByClassification();
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
