import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Header() {
  const { onInputChange, filterByName: { name },
    onClassifcChange, createDeleteButton,
    columnCompValue, comparisson,
    onButtonFilter, classification } = useContext(PlanetContext);

  // console.log('filterValues', columnCompValue);

  return (
    <header>
      <div>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            placeholder="Filtre por nome"
            data-testid="name-filter"
            onChange={ onInputChange }
            value={ name }
          />
        </label>
      </div>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          onButtonFilter();
        } }
      >
        <label htmlFor="classificationSelect">
          <select
            name="column"
            id="classificationSelect"
            data-testid="column-filter"
            onChange={ onClassifcChange }
          >
            {classification.map((classOptions) => (
              <option key={ classOptions } value={ classOptions }>{classOptions}</option>
            ))}
          </select>
        </label>
        <label htmlFor="rangeSelector">
          <select
            name="comparison"
            id="rangeSelector"
            data-testid="comparison-filter"
            onChange={ onClassifcChange }
          >
            {comparisson.map((compOptions) => (
              <option key={ compOptions }>{compOptions}</option>
            ))}
          </select>
        </label>
        <label htmlFor="number_filter">
          <input
            type="number"
            name="value"
            id="number_filter"
            placeholder="valor"
            value={ columnCompValue.value }
            data-testid="value-filter"
            onChange={ onClassifcChange }
          />
        </label>
        <button
          type="submit"
          // onClick={ () => onButtonFilter() }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      <div>
        {createDeleteButton()}
      </div>
    </header>
  );
}
