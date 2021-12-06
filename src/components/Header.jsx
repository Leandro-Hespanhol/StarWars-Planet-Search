import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Header() {
  const { onInputChange, onNumberValueChange, filterByName: { name },
    onClassifcChange, filteredByClassification,
    onParamChange, numberValue } = useContext(PlanetContext);

  return (
    <header>
      <div>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            placeholder="Filtre por nome"
            data-testid='name-filter'
            onChange={ onInputChange }
            value={ name }
          />
        </label>
      </div>
      <div>
        <label htmlFor="classificationSelect">
          <select
            name=""
            id="classificationSelect"
            data-testid="column-filter"
            onChange={ onClassifcChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="rangeSelector">
          <select
            name=""
            id="rangeSelector"
            data-testid="comparison-filter"
            onChange={ onParamChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="number_filter">
          <input
            type="number"
            name=""
            id="number_filter"
            placeholder="valor"
            value={ numberValue }
            data-testid='value-filter'
            onChange={ onNumberValueChange }
          />
        </label>
        <button
          type="button"
          onClick={ () => filteredByClassification }
          data-testid='button-filter'
        >
          Filtrar
        </button>
      </div>
      {console.log(filteredByClassification)}
    </header>
  );
}
