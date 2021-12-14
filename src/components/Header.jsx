import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import columnArray from '../data/columnArray';

export default function Header() {
  const { onInputChange, filterByName: { name },
    onClassifcChange, createDeleteButton, onOrderFilterChange,
    columnCompValue, comparisson, sortFilter, buttonSortByOrder, columnClassf,
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
              <option
                key={ compOptions }
                onChange={ onClassifcChange }
              >
                {compOptions}
              </option>
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
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      <div>
        {createDeleteButton()}
      </div>
      <div>
        <select
          name="column"
          data-testid="column-sort"
          onChange={ onOrderFilterChange }
          value={ columnClassf }
        >
          {columnArray.map((columns) => (
            <option key={ columns }>{columns}</option>
          ))}
        </select>
        <label htmlFor="ASC">
          Ascendente
          <input
            type="radio"
            name="orderBy"
            id="ASC"
            data-testid="column-sort-input-asc"
            onChange={ sortFilter }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            name="orderBy"
            id="DESC"
            data-testid="column-sort-input-desc"
            onChange={ sortFilter }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => buttonSortByOrder() }
        >
          Ordenar
        </button>
      </div>
    </header>
  );
}
