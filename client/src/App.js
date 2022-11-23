import { Route } from "react-router-dom";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon.jsx";
import Home from "./components/Home/Home.jsx";
import Initial from "./components/Initial/Initial.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import "./colors.css";
import DetailPokemon from "./components/DetailPokemon/DetailPokemon.jsx";
import Pokemons from "./components/Pokemons/Pokemons.jsx";

function App() {
  return (
    <>
      <Route exact path="/" component={Initial} />
      <Route path="/pokemons" component={NavBar} />
      <Route exact path="/pokemons" component={Home} />
      <Route exact path="/pokemons/crearPokemon" component={CreatePokemon} />
      <Route exact path="/pokemons/verPokemons" component={Pokemons} />
      <Route exact path="/pokemons/detail/:id" component={DetailPokemon} />
    </>
  );
}

export default App;
