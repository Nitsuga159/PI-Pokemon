import React from "react";
import { useDispatch } from "react-redux";
import s from "./Paginate.module.css";
import Svg from "../../Svg/Svg.jsx";
import actionsCreators from "../../../actions/index.js";

const { incrementPage, decrementPage, setPage } = actionsCreators;

export default function Paginate({ mapPokemons, page }) {
  const dispatch = useDispatch();

  return (
    <div className={[s.buttons]}>
      <Svg
        type="arrowLeft"
        className="prev-page"
        s={s}
        onClick={() => dispatch(decrementPage())}
      />
      {mapPokemons(true)
        .slice(0, Math.ceil(mapPokemons(true).length / 12))
        .map((_, i) => (
          <div
            onClick={() => dispatch(setPage(i))}
            className={i === page ? s["is-button-active"] : ""}
            key={i}
          >
            {i + 1}
          </div>
        ))}
      <Svg
        type="arrowRight"
        className="next-page"
        s={s}
        onClick={() => dispatch(incrementPage(mapPokemons(true)))}
      />
    </div>
  );
}
