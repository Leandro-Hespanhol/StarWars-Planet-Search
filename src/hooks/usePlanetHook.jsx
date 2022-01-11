import { useState, useEffect } from 'react';

function FetchAPIPlanets() {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/?page=1';

  useEffect(() => {
    async function fetchPlanets() {
      const { results } = await fetch(URL).then((resp) => resp.json());
      setPlanets(results.sort((a, b) => ((a.name > b.name) ? 1 : +('-1'))));
      setAllPlanets(results.sort((a, b) => ((a.name > b.name) ? 1 : +('-1'))));
    }
    fetchPlanets();
  }, []);
  return [planets, allPlanets, setAllPlanets];
}

export default FetchAPIPlanets;
