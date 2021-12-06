import { useState, useEffect } from 'react';

function FetchAPIPlanets() {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/?page=1';

  useEffect(() => {
    async function fetchPlanets() {
      const { results } = await fetch(URL).then((resp) => resp.json());
      setPlanets(results);
      setAllPlanets(results);
    }
    fetchPlanets();
  }, []);
  return [planets, allPlanets, setAllPlanets];
}

export default FetchAPIPlanets;
