import React from "react";
import Svg from "../../Svg/Svg.jsx";
import s from "./Search.module.css";

export default function Search({
  handlerSubmit,
  handlerSelectFilter,
  handlerSelectSort,
  setSearch,
  search,
  sortOption,
  filterOption,
  resetAll,
}) {
  return (
    <form onSubmit={handlerSubmit} className={s["search-form"]}>
      <Svg type="reload" className="reset-button" s={s} onClick={resetAll} />
      <div className={s["filter-container"]}>
        <p>Filtrar:</p>
        <select
          value={filterOption}
          onChange={handlerSelectFilter}
          className={s["select"]}
        >
          <option value="none">Ninguno</option>
          <option value="existingPokemons">Pokemons existentes</option>
          <option value="createdPokemons">Pokemons creados</option>
          <option value="types grass">Grass</option>
          <option value="types poison">Poison</option>
          <option value="types bug">Bug</option>
          <option value="types electric">Electric</option>
          <option value="types normal">Normal</option>
          <option value="types ground">Ground</option>
          <option value="types fire">Fire</option>
          <option value="types water">Water</option>
          <option value="types dragon">Dragon</option>
          <option value="types flying">Flying</option>
          <option value="types fairy">Fairy</option>
          <option value="types ghost">Ghost</option>
          <option value="types unknown">Unknown</option>
          <option value="types dark">Dark</option>
          <option value="types shadow">Shadow</option>
          <option value="types ice">Ice</option>
          <option value="types steel">Steel</option>
          <option value="types fighting">Fighting</option>
          <option value="types rock">Rock</option>
          <option value="types bug">Bug</option>
          <option value="types psychic">Psychic</option>
        </select>
      </div>
      <div className={s["sort-container"]}>
        <p>Ordenar:</p>
        <select
          value={sortOption}
          onChange={handlerSelectSort}
          className={s["select"]}
        >
          <option value="none">Ninguno</option>
          <option value="alphabetical">Alfabético</option>
          <option value="attack">Ataque</option>
          <option value="defense">Defensa</option>
          <option value="weak">Débil</option>
        </select>
      </div>
      <div className={s["search-container"]}>
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setSearch(() => e.target.value)}
          value={search}
        />
        <button type="submit" className={s["submit-search"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
