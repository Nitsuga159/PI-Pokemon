import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actionsCreators from "../../actions/index.js";
import Form from "../Form/Form.jsx";
import ResultMessage from "../ResultMessage/ResultMessage.jsx";
import createPokemon from "./createPokemon.js";
import sRoot from "../../index.module.css";
import s from "./CreatePokemon.module.css";

const { getPokemons, getTypes, getUserPokemons } = actionsCreators;

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const { isLogin } = useSelector((state) => state.user);
  const [messageSettings, setMessageSettings] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!types.length) dispatch(getTypes());
  }, [dispatch, types]);

  const handlerSubmitPokemon = (inputs) => {
    let obj = {
      ...inputs,
      hp: +inputs.hp,
      attack: +inputs.attack,
      defense: +inputs.defense,
      speed: +inputs.speed,
      height: +inputs.height,
      weight: +inputs.weight,
    };

    createPokemon({
      ...obj,
      password: localStorage.getItem("password"),
      email: localStorage.getItem("email"),
    })
      .then((res) => {
        setMessageSettings((settings) => ({
          ...settings,
          show: true,
          type: "success",
          title: "Pokemon creado correctamente",
          message: `"${res.name.toUpperCase()}" ha sido creado exitosamente con el ID: ${
            res.id
          } ^w^`,
        }));
        dispatch(getUserPokemons(localStorage.getItem("email")));
        dispatch(getPokemons());
      })
      .catch((err) =>
        setMessageSettings((settings) => ({
          ...settings,
          show: true,
          type: "cancel",
          title: "No se pudo crear el pokemon",
          message: `${err.error}: ${err.message}`,
        }))
      );
  };

  const closeMessage = () =>
    setMessageSettings((settings) => ({ ...settings, show: false }));

  const validateId = async (id) => {
    if (!/^[a-zA-Z]{2}\d{4}$/.test(id))
      return setMessageSettings((settings) => ({
        ...settings,
        show: true,
        type: "cancel",
        title: "Formato Incorrecto",
        message:
          "Por favor, introduce un ID con el formato correcto para verificar su existencia.",
      }));

    const result = await fetch(`http://localhost:3001/pokemons/${id}`);
    const json = await result.json();

    let options = json.notFound
      ? {
          type: "success",
          title: "ID disponible",
          message: "El ID se encuentra libre para su uso :)",
        }
      : {
          type: "cancel",
          title: "ID ocupado",
          message: "El ID consultado se encuentra ocupado por otro.",
        };

    setMessageSettings((settings) => ({
      ...settings,
      ...options,
      show: true,
    }));
  };

  if (!isLogin)
    return (
      <div className={`${s["container-form"]} ${sRoot["root-container"]}`}>
        <div className={s.blur}></div>
        <h2 className={s["no-access-message"]}>
          Conectáte o creá una cuenta para crear Pokemons!
        </h2>
      </div>
    );

  return (
    <div className={`${s["container-form"]} ${sRoot["root-container"]}`}>
      <div className={s.blur}></div>
      <Form
        handlerSubmitPokemon={handlerSubmitPokemon}
        type="CREATE"
        types={types}
        validateId={validateId}
      />
      {messageSettings.show && (
        <ResultMessage
          type={messageSettings.type}
          title={messageSettings.title}
          message={messageSettings.message}
          cancelCb={closeMessage}
        />
      )}
    </div>
  );
}
