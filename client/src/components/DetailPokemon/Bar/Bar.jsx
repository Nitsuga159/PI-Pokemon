import React from "react";
import s from "./Bar.module.css";

export default function Bar({ number, max, name }) {
  const style = {
    width: `${Math.floor((number / max) * 100)}%`,
  };

  if (!number)
    return (
      <div className={s["bar-container"]}>
        <p>No definido</p>
      </div>
    );

  return (
    <div className={s["bar-container"]}>
      <div className={s[name]} style={style}></div>
      <p className={s.number}>{`${name}: ${number}`}</p>
    </div>
  );
}
