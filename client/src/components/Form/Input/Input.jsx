import React from "react";
import s from "./Input.module.css";

export default function Input({
  type,
  name,
  title,
  cb,
  inputState,
  placeholder,
  error,
  handlerButton,
  disabled,
}) {
  return (
    <div className={s["container-input"]}>
      <h3>{title}</h3>
      <input
        type={type}
        name={name}
        onChange={cb}
        value={inputState}
        placeholder={placeholder}
        step="0.1"
        disabled={disabled ? true : false}
      />
      {handlerButton && !disabled && (
        <button
          type="button"
          onClick={handlerButton}
          className={s["button-verification"]}
        >
          Verificar
        </button>
      )}
      {error && <p className={s["error"]}>{error}</p>}
    </div>
  );
}
