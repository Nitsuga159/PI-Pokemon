const URL = "http://localhost:3001";
//Parámetros { dataPokemon, email, password }
const createPokemon = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${URL}/pokemons`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .catch((err) => err.json().then((err) => Promise.reject(err)));
};

export default createPokemon;
