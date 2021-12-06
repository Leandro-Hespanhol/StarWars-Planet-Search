import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import FetchAPIPlanets from '../hooks/usePlanetHook';

export default function PlanetProvider({ children }) {
  const [planets] = FetchAPIPlanets();

  const [nameInput, setNameInput] = useState([planets]);
  const [classification, setClassification] = useState('population');
  const [numberValue, setNumberValue] = useState(0);
  const [paramValue, setParamValue] = useState('maior que');

  const onInputChange = ({ target }) => {
    setNameInput(target.value);
  };

  const onClassifcChange = ({ target }) => {
    setClassification(target.value);
  };

  const onNumberValueChange = ({ target }) => {
    setNumberValue(target.value);
  };

  const onParamChange = ({ target }) => {
    setParamValue(target.value);
  };

  const filteredPlanets = (planets === ''
    ? planets
    : planets.filter((elem) => elem.name.includes(nameInput)));

  const filteredByClassification = filteredPlanets.filter((planet) => {
    switch (paramValue) {
    case 'menor que':
      return Number(planet[classification]) < Number(numberValue);
    case 'maior que':
      return Number(planet[classification]) > Number(numberValue);
    case 'igual a':
      return Number(planet[classification]) === Number(numberValue);
    default:
      return [];
    }
  });

  const contextValue = {
    planets,
    onInputChange,
    filteredPlanets,
    onClassifcChange,
    filteredByClassification,
    onNumberValueChange,
    onParamChange,
    numberValue,
    filterByName: {
      name: nameInput,
    },
    filterByNumericValues: [
      {
        column: classification,
        comparison: paramValue,
        value: paramValue,
      },
    ],
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
