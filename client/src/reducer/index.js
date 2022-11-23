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

const initialState = {
  pokemons: [],
  filterOption: "none",
  sortOption: "none",
  pokemon: {},
  userPokemons: { pokemons: [], called: false },
  types: [],
  page: 0,
  user: {
    isAdmin: false,
    isLogin: false,
    registerError: false,
    loginError: false,
    email: "",
    password: "",
  },
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        page: 0,
      };
    case GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };
    case GET_USER_POKEMONS:
      return {
        ...state,
        userPokemons: { pokemons: action.payload, called: true },
      };
    case SET_FILTER_OPTION:
      return {
        ...state,
        filterOption: action.payload,
        page: 0,
      };
    case SET_SORT_OPTION:
      return {
        ...state,
        sortOption: action.payload,
        page: 0,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case RESET_POKEMONS:
      return {
        ...state,
        pokemons: { called: true },
      };
    case CREATE_USER: {
      let { email, password, isAdmin } = action.payload;

      if (email && password) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }

      return {
        ...state,
        user: {
          isLogin: !email || !password ? false : true,
          isAdmin,
          email,
          password,
          registerError: action.payload.registerError,
        },
      };
    }
    case LOGIN_USER: {
      let { email, password, isAdmin } = action.payload;

      if (email && password) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }

      return {
        ...state,
        user: {
          isLogin: !email || !password ? false : true,
          isAdmin,
          email,
          password,
          loginError: action.payload.loginError,
        },
      };
    }
    case LOGOUT_USER:
      return {
        ...state,
        userPokemons: {},
        user: {
          isAdmin: false,
          isLogin: false,
          registerError: false,
          loginError: false,
          email: "",
          password: "",
        },
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case INCREMENT_PAGE:
      return {
        ...state,
        page:
          state.page + 1 < Math.ceil(action.payload.length / 12)
            ? state.page + 1
            : state.page,
      };
    case DECREMENT_PAGE:
      return {
        ...state,
        page: state.page - 1 >= 0 ? state.page - 1 : state.page,
      };
    default:
      return state;
  }
}
