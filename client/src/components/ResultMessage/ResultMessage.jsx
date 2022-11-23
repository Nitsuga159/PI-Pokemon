import React from "react";
import { useState } from "react";
import Svg from "../Svg/Svg.jsx";
import s from "./ResultMessage.module.css";

export default function ResultMessage({
  type,
  title,
  message,
  cancelCb,
  nameCb,
  cb,
}) {
  const [messageVisiblity, setMessageVisibility] = useState(true);

  const handlerCb = (type) => {
    setMessageVisibility(false);

    setTimeout(type === "cancel" ? cancelCb : cb, 1000);
  };

  return (
    <div
      className={`${s["message-container"]} ${s[type]} ${
        !messageVisiblity ? s["hide-container-message"] : ""
      }`.trim()}
    >
      <Svg
        type="cancel"
        onClick={() => handlerCb("cancel")}
        className="cancel-button"
        s={s}
      />
      <h3
        className={`${s.title} ${
          type === "cancel" ? s["error-message"] : s["success-message"]
        }`}
      >
        {title}
      </h3>
      <p className={s.message}>{message}</p>
      {nameCb && cb && (
        <button onClick={() => handlerCb("cb")} className={s["cb-button"]}>
          {nameCb}
        </button>
      )}
    </div>
  );
}
