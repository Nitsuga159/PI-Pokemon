import React from "react";
import loading from "../../images/pikachu-loading.gif";
import s from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={s["card-detail-container"]}>
      <img src={loading} alt="loading" className={s.loading} />
    </div>
  );
}
