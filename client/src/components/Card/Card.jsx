import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import notFound from "../../images/pokemon-notfound.png";
import Svg from "../Svg/Svg.jsx";
import s from "./Card.module.css";
import actionsCreators from "../../actions";
import API from "../../api.js";

const { getPokemons } = actionsCreators;

export default function Card({
  name,
  image,
  types,
  id,
  userEmail,
  onlyCard,
  buttons,
  setVisibilityForm,
  setTargetPokemonId,
  showDeleteMessage,
}) {
  const dispatch = useDispatch();
  const { isAdmin, email, password } = useSelector((state) => state.user);

  const deleteCardOrUser = () => {
    let choice;
    do {
      choice = prompt("Selecciona el tipo 'pokemon' o 'user'");
    } while (choice !== "pokemon" && choice !== "user" && choice);

    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    if (choice === "pokemon") {
      fetch(
        `${API}/pokemons/admin?choice=${choice}&identificator=${id}`,
        options
      )
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((res) => {
          dispatch(getPokemons());
          console.log("pokemon eliminado");
          window.location.pathname = "/pokemons";
        });
    }

    if (choice === "user") {
      let blocked = window.confirm("¿Quieres bloquear al usuario?");

      fetch(
        `${API}/pokemons/admin?choice=${choice}&identificator=${userEmail}&blocked=${blocked}`,
        options
      )
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((res) => {
          dispatch(getPokemons());
          console.log("user eliminado");
          window.location.pathname = "/pokemons";
        });
    }
  };

  const helperEdit = () => {
    setTargetPokemonId(id);
    setVisibilityForm(true);
  };

  const component = (
    <>
      {isAdmin && isNaN(Number(id)) && (
        <Svg
          type="cancel"
          onClick={deleteCardOrUser}
          s={s}
          className="delete-by-admin"
        />
      )}
      <img
        src={image[0] ? image[0] : notFound}
        alt={name}
        className={s["card-image"]}
      />
      <h2 className={s["card-name"]}>{name}</h2>
      <ul className={s["types-container"]}>
        {types?.map((t, i) => (
          <li className={`${s[t.name]} ${s["type"]}`} key={i}>
            {t.name}
          </li>
        ))}
      </ul>
      {buttons && (
        <div className={s.buttons}>
          <button className={s.eliminar} onClick={() => showDeleteMessage(id)}>
            eliminar
          </button>
          <button className={s.editar} onClick={helperEdit}>
            editar
          </button>
        </div>
      )}
    </>
  );

  if (onlyCard) return <div className={s["card-container"]}>{component}</div>;
  else
    return (
      <NavLink to={`/pokemons/detail/${id}`} className={s["card-container"]}>
        {component}
      </NavLink>
    );
}
