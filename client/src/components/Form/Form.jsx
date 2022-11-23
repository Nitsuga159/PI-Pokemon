import React, { useEffect, useState } from "react";
import errorsInputs from "./errorsInputs.js";
import Input from "./Input/Input.jsx";
import s from "./Form.module.css";
import createInputsValues from "./createInputsValues.js";
import pikachuImage from "../../images/pikachu.png";

export default function Form({
  type,
  types,
  handlerSubmitPokemon,
  setVisibilityForm,
  validateId,
  pokemon,
}) {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState(errorsInputs(inputs));

  useEffect(() => setErrors(errorsInputs(inputs)), [inputs]);

  useEffect(
    () => setInputs(createInputsValues(pokemon, type, types)),
    [types, pokemon, type]
  );
  //HANDLERS

  const handlerInputs = (e) => {
    let value = e.target.value,
      name = e.target.name;
    setInputs((inputs) => ({
      ...inputs,
      [name]: name === "id" || name === "image" ? value : value.toLowerCase(),
    }));
  };

  const handlerChangeType = (e) => {
    let value = e.target.value;
    if (value === "none") return;
    setInputs((inputs) => ({
      ...inputs,
      types: inputs.types.includes(+value)
        ? inputs.types
        : inputs.types.concat(+value),
    }));
  };

  const helperSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).filter((e) => e).length) return;

    handlerSubmitPokemon(inputs);

    setInputs(createInputsValues(pokemon || {}, type, types));
  };

  return (
    <form className={s["form-pokemon"]} onSubmit={helperSubmit}>
      <div className={s["container-inputs-one"]}>
        <Input
          type="text"
          name="id"
          title="ID:"
          placeholder="Ej: ar1234"
          cb={handlerInputs}
          inputState={inputs.id || ""}
          error={errors.id || ""}
          handlerButton={() => validateId(inputs.id)}
          disabled={type === "CREATE" ? false : true}
        />
        <Input
          type="text"
          name="name"
          title="Nombre: "
          placeholder="Ej: Nodemon"
          cb={handlerInputs}
          inputState={inputs.name || ""}
          error={errors.name || ""}
        />
        <Input
          type="number"
          name="hp"
          title="Vida: "
          placeholder="1 - 150"
          cb={handlerInputs}
          inputState={inputs.hp || ""}
          error={errors.hp || ""}
        />
        <Input
          type="number"
          name="attack"
          title="Ataque: "
          placeholder="1 - 150"
          cb={handlerInputs}
          inputState={inputs.attack || ""}
          error={errors.attack || ""}
        />

        <Input
          type="number"
          name="defense"
          title="Defensa: "
          placeholder="1 - 150"
          cb={handlerInputs}
          inputState={inputs.defense || ""}
          error={errors.defense || ""}
        />
      </div>
      <div className={s["container-inputs-two"]}>
        <Input
          type="number"
          name="height"
          title="Altura (m): "
          placeholder="0.1 - 5"
          cb={handlerInputs}
          inputState={inputs.height || ""}
          error={errors.height || ""}
        />
        <Input
          type="number"
          name="weight"
          title="Peso (kg): "
          placeholder="1 - 200"
          cb={handlerInputs}
          inputState={inputs.weight || ""}
          error={errors.weight || ""}
        />
        <Input
          type="number"
          name="speed"
          title="Velocidad :"
          placeholder="1 - 150"
          cb={handlerInputs}
          inputState={inputs.speed || ""}
          error={errors.speed || ""}
        />
        <Input
          type="text"
          name="image"
          title="Imagen: "
          placeholder="URL: https://imagenes/mi-imagen.jpg"
          cb={handlerInputs}
          inputState={inputs.image || ""}
          error={errors.image || ""}
        />
        <div className={s["container-select"]}>
          <h3>Tipos: </h3>
          <select
            name="type"
            onChange={handlerChangeType}
            disabled={inputs.types?.length >= 2 ? true : false}
          >
            <option value="none">none</option>
            {types?.map((t) => (
              <option value={t.id} key={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <ul className={s["list-types"]}>
            {inputs.types?.map((i) => (
              <li key={i}>
                {types[i - 1].name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="#F43C33"
                  onClick={() =>
                    setInputs((inputs) => ({
                      ...inputs,
                      types: inputs.types.filter((p) => p !== i),
                    }))
                  }
                >
                  <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"></path>
                </svg>
              </li>
            ))}
          </ul>
          {errors.types && <p className={s["error"]}>{errors.types}</p>}
        </div>
      </div>
      <input
        type="submit"
        value={`${type === "CREATE" ? "CREAR" : "ACTUALIZAR"} POKEMON`}
        className={s["submit-button"]}
      />
      {pokemon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="#F43C33"
          className={s["hide-button"]}
          onClick={() => setVisibilityForm(false)}
        >
          <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"></path>
        </svg>
      )}
      <img src={pikachuImage} alt="pikachu" className={s["pikachu-image"]} />
    </form>
  );
}
