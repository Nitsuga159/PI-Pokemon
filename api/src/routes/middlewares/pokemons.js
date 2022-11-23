const { Router } = require("express");
const extractUser = require("./extractUser.js");
const handlerErrors = require("./handlerErrors.js");
const pokemon = Router();
const {
  getPokemons,
  getCreatedPokemons,
  getpokemon,
  postPokemon,
  putPokemon,
  deletePokemon,
  deleteByAdmin,
  unblockedByAdmin,
} = require("./models-functions/pokemonFunc");

pokemon.get("/", async (req, res) => {
  let { name } = req.query;

  try {
    res.status(200).json(await getPokemons(name));
  } catch (e) {
    handlerErrors(e, res);
  }
});

pokemon.get("/created", async (req, res) => {
  const { email } = req.query;

  try {
    res.status(200).json(await getCreatedPokemons(email));
  } catch (e) {
    handlerErrors(e, res);
  }
});

pokemon.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  try {
    res.status(200).json(await getpokemon(idPokemon));
  } catch (e) {
    handlerErrors(e, res);
  }
});

pokemon.post("/", extractUser, async (req, res) => {
  try {
    res.status(201).json(await postPokemon(req.body));
  } catch (e) {
    handlerErrors(e, res);
  }
});

pokemon.put("/", extractUser, async (req, res) => {
  try {
    res.status(200).json(await putPokemon(req.body));
  } catch (e) {
    console.log(e);
    handlerErrors(e, res);
  }
});

pokemon.delete("/admin", extractUser, async (req, res) => {
  try {
    if (req.body.email !== process.env.ADMIN)
      throw {
        error: "cannotDelete",
        message: "No tienes los permisos necesarios",
      };

    res.status(200).json(await deleteByAdmin(req.query));
  } catch (e) {
    handlerErrors(e, res);
  }
});

pokemon.delete("/unblocked", extractUser, async (req, res) => {
  try {
    if (req.body.email !== process.env.ADMIN)
      throw {
        error: "cannotDelete",
        message: "No tienes los permisos necesarios",
      };

    res.status(200).json(await unblockedByAdmin(req.query));
  } catch (e) {
    handlerErrors(e, res);
  }
});

pokemon.delete("/:id", extractUser, async (req, res) => {
  const { id } = req.params;

  try {
    res.status(200).json(await deletePokemon({ id, ...req.body }));
  } catch (e) {
    handlerErrors(e, res);
  }
});

module.exports = pokemon;
