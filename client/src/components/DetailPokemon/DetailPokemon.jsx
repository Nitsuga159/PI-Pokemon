import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionsCreators from "../../actions";
import notFound from "../../images/pokemon-notfound.png";
import pokeball from "../../images/pokeball.png";
import Bar from "./Bar/Bar.jsx";
import sRoot from "../../index.module.css";
import s from "./DetailPokemon.module.css";
import Loading from "../Loading/Loading.jsx";

const { getPokemon } = actionsCreators;

export default function DetailPokemon({ match }) {
  const id = match.params.id;
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemon(id));
  }, [dispatch, id]);

  if (pokemon.id?.toString() !== id)
    return (
      <div
        className={`${s["card-detail-container"]} ${sRoot["root-container"]}`}
      >
        <Loading />
      </div>
    );

  return (
    <div className={`${s["card-detail-container"]} ${sRoot["root-container"]}`}>
      <div className={s["subcontainer"]}>
        <div className={s["container-one"]}>
          <h3 className={s["title"]}>{pokemon.name.toUpperCase()}</h3>
          <figure className={s["container-perfil"]}>
            <img
              src={pokemon.user ? pokemon.user.image : pokeball}
              alt={pokemon.user ? pokemon.user.username : "pokeapi"}
            />
            <figcaption>
              Creado por{" "}
              <b>
                {pokemon.user ? pokemon.user.username.toUpperCase() : "PokeAPI"}
              </b>
            </figcaption>
          </figure>
          <h4 className={s.data}>ID: {pokemon.id}</h4>
          <h4 className={s.data}>
            {pokemon.height
              ? `Altura: ${pokemon.height} m`
              : "Altura: no definido..."}
          </h4>
          <h4 className={s.data}>
            {pokemon.weight
              ? `Peso: ${pokemon.weight} kg`
              : "Peso: no definido..."}
          </h4>
        </div>
        <div className={s["container-two"]}>
          <img
            src={pokemon.image[1] || pokemon.image[0] || notFound}
            alt={pokemon.name}
            className={s["image-pokemon"]}
          />
          <Bar number={pokemon.hp} max={150} name="vida" />
          <Bar number={pokemon.attack} max={150} name="ataque" />
          <Bar number={pokemon.defense} max={150} name="defensa" />
          <Bar number={pokemon.speed} max={150} name="velocidad" />
        </div>
      </div>
    </div>
  );
}
