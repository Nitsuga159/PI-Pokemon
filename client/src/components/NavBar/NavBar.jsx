import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import s from "./NavBar.module.css";
import ResultMessage from "../ResultMessage/ResultMessage.jsx";
import actionsCreators from "../../actions";
import firebaseRequest from "./firebaseRequest";

const { logout, login, createUser } = actionsCreators;

export default function NavBar() {
  const dispatch = useDispatch();
  const { isLogin, registerError, loginError } = useSelector(
    (state) => state.user
  );
  const [username, setUsername] = useState("");
  const [visibilityFormLogin, setVisibilityFormLogin] = useState(true);
  const [visibilityFormRegister, setVisibilityFormRegister] = useState(true);
  const [messageSettings, setMessageSettings] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");

    if (!email || !password) return;

    dispatch(login({ email, password }));
  }, [dispatch]);

  useEffect(() => {
    if (!registerError && !loginError) return;

    let { message, error } = registerError || loginError;
    setMessageSettings(() => ({
      show: true,
      type: "cancel",
      title: error,
      message,
    }));
  }, [registerError, loginError]);

  //Decide en base al isLogin, que es una propiedad del estado global
  const handlerLogin = (e) => {
    e.preventDefault();
    isLogin ? logoutUser() : loginUser();
  };

  const loginUser = () => setVisibilityFormLogin(false);

  //Desloguea al usuario y remueve el email y password del localStorage
  const logoutUser = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    dispatch(logout());
  };

  const closeMessage = () =>
    setMessageSettings((settings) => ({ ...settings, show: false }));

  //Maneja la autenticación con firebase. Después con los datos obtenidos llama al action
  //login para verificar si es una cuenta creada en la base de datos.
  const handlerSubmitFirebase = (e, type) => {
    e.preventDefault();

    firebaseRequest(
      (result) => {
        const user = result.user;
        let email = user.email,
          password = user.uid,
          image = user.photoURL,
          { apiKey } = user.auth.config;

        if (type === "register") {
          setVisibilityFormRegister(true);
          dispatch(createUser({ email, password, username, image, apiKey }));
          setUsername("");
        } else {
          setVisibilityFormLogin(true);
          dispatch(login({ email, password }));
        }
      },
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        console.log(errorCode, errorMessage, email);
      }
    );
  };

  const activeLink = {
    color: "var(--yellow)",
    fontWeight: "bold",
    textShadow: "0px 0px 2px yellow",
  };

  return (
    <>
      <div className={s["navbar-container"]}>
        <div className={s["links"]}>
          <NavLink to="/pokemons" exact activeStyle={activeLink}>
            Home
          </NavLink>
          <NavLink to="/pokemons/crearPokemon" exact activeStyle={activeLink}>
            Crear Pokemon
          </NavLink>
          <NavLink to="/pokemons/verPokemons" exact activeStyle={activeLink}>
            Ver Pokemons
          </NavLink>
        </div>
        <div className={s["register-login"]}>
          <button onClick={handlerLogin}>
            {isLogin ? "Salir" : "Iniciar"}
          </button>
          <button onClick={() => setVisibilityFormRegister((prev) => !prev)}>
            Registrarse
          </button>
        </div>
      </div>
      <div className={s["container-register-form"]}>
        <form
          onSubmit={(e) => handlerSubmitFirebase(e, "login")}
          className={`${s["login-form"]} ${
            visibilityFormLogin ? s["hide"] : ""
          }`.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="#F43C33"
            className={s.cancel}
            onClick={() => setVisibilityFormLogin(true)}
          >
            <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"></path>
          </svg>
          <input type="submit" value="Conectar con Google" />
        </form>
      </div>
      <div className={s["container-register-form"]}>
        <form
          onSubmit={(e) => handlerSubmitFirebase(e, "register")}
          className={`${s["register-form"]} ${
            visibilityFormRegister ? s["hide"] : ""
          }`.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="#F43C33"
            className={s.cancel}
            onClick={() => setVisibilityFormRegister(true)}
          >
            <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"></path>
          </svg>
          <h3>Elige un username:</h3>
          <p>Debe empezar al menos con 4 letras y un carácter</p>
          <input
            type="text"
            placeholder="Ej: Nitsuga159"
            onChange={(e) => setUsername(() => e.target.value)}
            value={username}
            pattern="^[a-zA-Z]{4}.+$"
            maxLength="20"
            required
          />
          <input type="submit" value="Crear con Google" />
        </form>
        {messageSettings.show && (
          <ResultMessage
            type={messageSettings.type}
            title={messageSettings.title}
            message={messageSettings.message}
            cancelCb={closeMessage}
          />
        )}
      </div>
    </>
  );
}
