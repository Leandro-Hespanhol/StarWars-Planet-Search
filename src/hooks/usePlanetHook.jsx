import { useState, useEffect } from 'react';

function FetchAPIPlanets() {
  const [planets, setPlanets] = useState([]);
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/?page=1';

  useEffect(() => {
    async function fetchPlanets() {
      const { results } = await fetch(URL).then((resp) => resp.json());
      setPlanets(results);
    }
    fetchPlanets();
  }, []);
  return [planets];
}

export default FetchAPIPlanets;
