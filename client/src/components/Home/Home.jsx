import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import notFound from "../../images/pokemon-notfound.png";
import notFoundSearch from "../../images/pokemon-notfound-search.png";
import actionsCreators from "../../actions";
import options from "./options.js";
import sRoot from "../../index.module.css";
import s from "./Home.module.css";
import ResultMessage from "../ResultMessage/ResultMessage.jsx";
import Loading from "../Loading/Loading.jsx";
import Search from "./Search/Search.jsx";
import Paginate from "./Paginate/Paginate.jsx";

const { filters, sorters } = options;
const { getPokemons, setFilterOption, setSortOption, resetPokemons } =
  actionsCreators;

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const page = useSelector((state) => state.page);
  const filterOption = useSelector((state) => state.filterOption);
  const sortOption = useSelector((state) => state.sortOption);
  const [search, setSearch] = useState("");
  const [messageSettings, setMessageSettings] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (pokemons.call === "again")
      return setMessageSettings({
        show: true,
        type: "cancel",
        title: "Fallo en la petición",
        message:
          "No se han podido traer los Pokemons. ¿Desea volver a intentarlo?",
        nameCb: "Sí, realizar la petición",
        cb: () => {
          setMessageSettings((settings) => ({ ...settings, show: false }));
          dispatch(getPokemons());
        },
      });

    if (!pokemons.length && !pokemons.result && !pokemons.called)
      dispatch(getPokemons());
  }, [pokemons, dispatch]);

  const resetAll = () => {
    setSearch(() => "");
    dispatch(setFilterOption("none"));
    dispatch(setSortOption("none"));
    dispatch(getPokemons());
  };

  const closeMessage = () => {
    setMessageSettings((settings) => ({ ...settings, show: false }));
    dispatch(resetPokemons());
  };

  // HANDLERS

  const handlerSubmit = (e) => {
    e.preventDefault();

    dispatch(getPokemons(search));
  };

  const handlerSelectFilter = (e) => {
    dispatch(setFilterOption(e.target.value));
  };

  const handlerSelectSort = (e) => {
    dispatch(setSortOption(e.target.value));
  };

  //MAPEADO DE POKEMONS EN EL RENDER

  const mapPokemons = (onlyFilter) => {
    let newPokemons = JSON.parse(JSON.stringify(pokemons));

    if (filterOption !== "none") {
      let [name, type] = filterOption.split(" ");

      newPokemons = newPokemons.filter((pokemon) =>
        filters[name](pokemon, type)
      );
    }

    if (onlyFilter) return newPokemons;

    if (sortOption !== "none")
      newPokemons = newPokemons.sort(sorters[sortOption]);

    return newPokemons
      ?.slice(page * 12, page * 12 + 12)
      .map((p) => (
        <Card
          key={p.id}
          id={p.id}
          name={p.name}
          image={p.image[0] ? p.image : [notFound]}
          types={p.types}
          userEmail={p.userEmail}
        />
      ));
  };

  const SearchBar = (
    <Search
      handlerSubmit={handlerSubmit}
      handlerSelectFilter={handlerSelectFilter}
      handlerSelectSort={handlerSelectSort}
      setSearch={setSearch}
      search={search}
      sortOption={sortOption}
      filterOption={filterOption}
      resetAll={resetAll}
    />
  );

  if (pokemons.result === "not-found")
    return (
      <div className={sRoot["root-container"]}>
        {SearchBar}
        <div className={s["container-notfound"]}>
          <img
            src={notFoundSearch}
            alt="search-notfound"
            className={s["notfound-image"]}
          />
          <h2 className={s["notfound-description"]}>
            No se encontró ningún pokemon...
          </h2>
        </div>
      </div>
    );

  if (!pokemons.length)
    return (
      <div className={sRoot["root-container"]}>
        {messageSettings.show && !pokemons.called && (
          <ResultMessage
            type={messageSettings.type}
            title={messageSettings.title}
            message={messageSettings.message}
            cancelCb={closeMessage}
            nameCb={messageSettings.nameCb}
            cb={messageSettings.cb}
          />
        )}
        {SearchBar}
        <Loading />
      </div>
    );

  return (
    <div className={sRoot["root-container"]}>
      {SearchBar}
      <Paginate mapPokemons={mapPokemons} page={page} />
      <div className={s["cards-container"]}>{mapPokemons()}</div>
      <Paginate mapPokemons={mapPokemons} page={page} />
    </div>
  );
}
