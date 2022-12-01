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

  return (
    <>
      <div className={s["navbar-container"]}>
        <div className={s["links"]}>
          <NavLink to="/pokemons" exact>
            <svg
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              width="460.298px"
              height="460.297px"
              viewBox="0 0 460.298 460.297"
            >
              <g>
                <g>
                  <path
                    d="M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041
			c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629
			c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939
			z"
                  />
                  <path
                    d="M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816
			c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245
			c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136
			c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998
			L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125
			c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z"
                  />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </NavLink>
          <NavLink to="/pokemons/crearPokemon" exact>
            <svg className={s.add} version="1.1" viewBox="0 0 15 15">
              <path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z" />
              <polygon points="8,3.5 7,3.5 7,7 3.5,7 3.5,8 7,8 7,11.5 8,11.5 8,8 11.5,8 11.5,7 8,7 " />
            </svg>
          </NavLink>
          <NavLink to="/pokemons/verPokemons" exact>
            <svg className={s.perfil} viewBox="0 0 32 32">
              <defs></defs>
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" />
                <path d="M16,17a5,5,0,1,1,5-5A5,5,0,0,1,16,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,16,9Z" />
                <path d="M25.55,24a1,1,0,0,1-.74-.32A11.35,11.35,0,0,0,16.46,20h-.92a11.27,11.27,0,0,0-7.85,3.16,1,1,0,0,1-1.38-1.44A13.24,13.24,0,0,1,15.54,18h.92a13.39,13.39,0,0,1,9.82,4.32A1,1,0,0,1,25.55,24Z" />
              </g>
              <g id="frame">
                <rect className={s["cls-1"]} />
              </g>
            </svg>
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
