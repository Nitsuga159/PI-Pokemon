import React from "react";
import { NavLink } from "react-router-dom";
import fondo from "../../images/fondo-pokemon.gif";
import logo from "../../images/pokemon-logo.svg";
import githubLogo from "../../images/github-logo.svg";
import linkedinLogo from "../../images/linkedin-logo.svg";
import s from "./InitialStyle.module.css";

export default function Initial() {
  return (
    <>
      <div className={s.rect}></div>
      <div className={s["sub-container"]}>
        <div className={s["welcome-container"]}>
          <h1 className={s.title}>
            Bienvenido a mi <span className={s.red}>Poke</span>-
            <span className={s.blue}>API</span>
          </h1>
          <p className={s.parrafo}>
            Una página sobre Pokemon, donde vas a poder explorar los distintos
            tipos de pokemons, su vida, defensa, ataque, habilidades, etc.
          </p>
          <p className={s.parrafo}>
            Además, podrás crear tus propios pokemons y ser observados por otros
            usuarios de esta página.
          </p>
          <NavLink to="/pokemons" className={s.iniciar}>
            Iniciar
          </NavLink>
        </div>
        <img
          src={fondo}
          className={s.fondo}
          draggable="false"
          alt="fondo-pokemon"
        />
      </div>
      <img src={logo} className={s.logo} alt="pokemon-logo" />

      <a
        href="https://github.com/Nitsuga159/PI-Pokemon"
        target="_blank"
        rel="noreferrer"
      >
        <img src={githubLogo} className={s.github} alt="github" />
      </a>
      <a
        href="https://www.linkedin.com/in/agust%C3%ADn-romero-33919b24b/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={linkedinLogo} className={s.linkedin} alt="linkedin" />
      </a>
    </>
  );
}
