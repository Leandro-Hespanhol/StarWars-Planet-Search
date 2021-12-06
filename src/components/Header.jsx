import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Header() {
  const { onInputChange, filterByName: { name },
    onClassifcChange,
    columnCompValue, comparisson, filterValues,
    onButtonFilter, classification } = useContext(PlanetContext);
  // var person=[{"name":"Billy","age":34}];
  // var clothing={"name":"Karen","age":35};
  // console.log(person.concat(clothing));
  console.log('filterValues', filterValues);

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
      <div>
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
          type="button"
          onClick={ () => onButtonFilter() }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </div>
    </header>
  );
}
