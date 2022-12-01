import {
  GET_POKEMON,
  GET_POKEMONS,
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_TYPES,
  GET_USER_POKEMONS,
  RESET_POKEMONS,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  SET_FILTER_OPTION,
  SET_SORT_OPTION,
  SET_PAGE,
} from "../reducer/actions.js";
import API from "../api.js";

const getPokemons = (name) => {
  let url = `${API}/pokemons`;
  if (name) url += `?name=${name}`;

  return function (dispatch) {
    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        if (res.length) dispatch({ type: GET_POKEMONS, payload: res });
        else dispatch({ type: GET_POKEMONS, payload: { result: "not-found" } });
      })
      .catch(() => {
        dispatch({ type: GET_POKEMONS, payload: { call: "again" } });
      });
  };
};

const getPokemon = (id) => {
  return function (dispatch) {
    fetch(`${API}/pokemons/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => dispatch({ type: GET_POKEMON, payload: res }))
      .catch((err) => err.json().then((err) => console.log(err)));
  };
};

//parámetros que requiere: {email, username, password, apiKey}
const createUser = (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return function (dispatch) {
    fetch(`${API}/register`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => dispatch({ type: CREATE_USER, payload: res }))
      .catch((err) =>
        err.json().then((registerError) =>
          dispatch({
            type: CREATE_USER,
            payload: { registerError },
          })
        )
      );
  };
};

//Parámetros: { email, password }
const login = (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return function (dispatch) {
    fetch(`${API}/login`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => dispatch({ type: LOGIN_USER, payload: res }))
      .catch((err) =>
        err.json().then((loginError) =>
          dispatch({
            type: LOGIN_USER,
            payload: { loginError },
          })
        )
      );
  };
};

const logout = () => ({ type: LOGOUT_USER });

const getTypes = () => {
  return function (dispatch) {
    fetch(`${API}/types`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => dispatch({ type: GET_TYPES, payload: res }))
      .catch((err) => err.json().then((err) => console.log(err)));
  };
};

const getUserPokemons = (email) => {
  return function (dispatch) {
    fetch(`${API}/pokemons/created?email=${email}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => dispatch({ type: GET_USER_POKEMONS, payload: res }))
      .catch((err) => err.json().then((err) => console.log(err)));
  };
};

const setFilterOption = (option) => ({
  type: SET_FILTER_OPTION,
  payload: option,
});

const setSortOption = (option) => ({ type: SET_SORT_OPTION, payload: option });

const resetPokemons = () => ({ type: RESET_POKEMONS });

const setPage = (page) => ({ type: SET_PAGE, payload: page });

const incrementPage = (pokemons) => ({
  type: INCREMENT_PAGE,
  payload: pokemons,
});

const decrementPage = () => ({ type: DECREMENT_PAGE });

const actionsCreators = {
  getPokemons,
  getPokemon,
  getTypes,
  getUserPokemons,
  setFilterOption,
  setSortOption,
  resetPokemons,
  createUser,
  login,
  logout,
  incrementPage,
  decrementPage,
  setPage,
};

export default actionsCreators;
