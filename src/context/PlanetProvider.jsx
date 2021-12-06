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

  function onInputChange({ target }) {
    setNameInput(target.value);
  }

  useEffect(() => {
    setAllPlanets(planets.filter((elem) => elem.name.includes(nameInput)));
  }, [nameInput]);

  const onClassifcChange = ({ target }) => {
    const { value, name } = target;
    setColumnCompValue({
      ...columnCompValue,
      [name]: value,
    });
  };

  // const filteredPlanets = (allPlanets === ''
  //   ? allPlanets
  //   : allPlanets.filter((elem) => elem.name.includes(nameInput)));

  const filteredByClassification = allPlanets.filter((planet) => {
    switch (columnCompValue.comparison) {
    case 'menor que':
      return Number(planet[columnCompValue.column]) < Number(columnCompValue.value);
    case 'maior que':
      return Number(planet[columnCompValue.column]) > Number(columnCompValue.value);
    case 'igual a':
      return Number(planet[columnCompValue.column]) === Number(columnCompValue.value);
    default:
      return [];
    }
  });

  const [filterValues, setFilterValues] = useState({
    filterByNumericValues: [],
  });

  function onButtonFilter() {
    setFilterValues({
      ...filterValues,
      filterByNumericValues: [
        ...filterValues.filterByNumericValues, columnCompValue,
      ],
    });
    setAllPlanets(filteredByClassification);
    setClassification([
      ...classification.filter((elem) => elem !== columnCompValue.column),
    ]);
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
