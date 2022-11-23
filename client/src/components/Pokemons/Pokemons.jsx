import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actionsCreators from "../../actions/index.js";
import Form from "../Form/Form.jsx";
import Card from "../Card/Card.jsx";
import sRoot from "../../index.module.css";
import s from "./Pokemons.module.css";
import ResultMessage from "../ResultMessage/ResultMessage.jsx";

const { getTypes, getUserPokemons, getPokemons } = actionsCreators;

export default function Pokemons() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const { pokemons, called } = useSelector((state) => state.userPokemons);
  const { isLogin, email, password } = useSelector((state) => state.user);
  const [targetPokemonId, setTargetPokemonId] = useState("");
  const [formVisibility, setFormVisibility] = useState(false);
  const [messageSettings, setMessageSettings] = useState({
    id: "",
    show: false,
    type: "",
    title: "",
    message: "",
    nameCb: "",
  });

  useEffect(() => {
    if (!called && isLogin)
      dispatch(getUserPokemons(localStorage.getItem("email")));
  }, [dispatch, called, isLogin, pokemons]);

  useEffect(() => {
    if (!types.length && isLogin) dispatch(getTypes());
  }, [dispatch, types, isLogin]);

  const closeMessage = () =>
    setMessageSettings((settings) => ({ ...settings, show: false }));

  const showDeleteMessage = (id) =>
    setMessageSettings((settings) => ({
      ...settings,
      show: true,
      id,
      type: "cancel",
      title: "Eliminar Pokemon",
      message: "¿Estás seguro de eliminar este pokemon?",
      nameCb: "¡Sí, quiero matarlo!",
    }));

  const handlerUpdatePokemon = async (inputs) => {
    let data = {
      email,
      password,
    };
    for (let key in inputs)
      if (inputs[key])
        data[key] = isNaN(+inputs[key]) ? inputs[key] : +inputs[key];

    return fetch("http://localhost:3001/pokemons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        setFormVisibility(false);
        dispatch(getUserPokemons(email));
        dispatch(getPokemons());

        setMessageSettings((settings) => ({
          ...settings,
          show: true,
          title: "Pokemon actualizado",
          message: `Se ha actualizado correctamente con los valores: ${Object.entries(
            res
          )
            .map((value) => value.join(": "))
            .join(", ")}`,
          nameCb: "",
        }));
      });
  };

  const handlerDeletePokemon = () => {
    setMessageSettings((settings) => ({ ...settings, show: false }));

    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    fetch(`http://localhost:3001/pokemons/${messageSettings.id}`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        dispatch(getPokemons());
        dispatch(getUserPokemons(email));

        setMessageSettings((settings) => ({
          ...settings,
          show: true,
          title: "Pokemon Eliminado",
          message: 'Últimas palabras del pokemon: "Siempre te querré 💕"',
          nameCb: "",
        }));
      });
  };

  const currentMessage = messageSettings.show && (
    <ResultMessage
      type={messageSettings.type}
      title={messageSettings.title}
      message={messageSettings.message}
      cancelCb={closeMessage}
      nameCb={messageSettings.nameCb}
      cb={messageSettings.nameCb && handlerDeletePokemon}
    />
  );

  if (!isLogin || !pokemons?.length)
    return (
      <div className={`${s["container-pokemons"]} ${sRoot["root-container"]}`}>
        <h2 className={s["no-access-message"]}>
          {isLogin
            ? "No tenés pokemons creados..."
            : "Conectáte o creá una cuenta para ver tus pokemons!"}
        </h2>
        {currentMessage}
      </div>
    );

  return (
    <div className={`${s["container-pokemons"]} ${sRoot["root-container"]}`}>
      <div className={s["subcontainer-pokemons"]}>
        {pokemons?.map((p) => (
          <Card
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image}
            types={p.types}
            buttons={true}
            onlyCard={true}
            setTargetPokemonId={setTargetPokemonId}
            setVisibilityForm={setFormVisibility}
            showDeleteMessage={showDeleteMessage}
          />
        ))}
        {formVisibility && (
          <Form
            type="UPDATE"
            types={types}
            pokemon={pokemons.find((p) => p.id === targetPokemonId)}
            handlerSubmitPokemon={handlerUpdatePokemon}
            setVisibilityForm={setFormVisibility}
          />
        )}
      </div>
      {currentMessage}
    </div>
  );
}
