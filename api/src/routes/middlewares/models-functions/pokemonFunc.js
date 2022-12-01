const { Pokemon, Type, User, BlockedUsers } = require("../../../db.js"),
  { Op } = require("sequelize"),
  fetch = require("node-fetch"),
  API = "https://pokeapi.co/api/v2/pokemon";

const modelPokemon = (obj) => {
  return {
    id: obj.id,
    name: obj.name,
    hp: obj.stats[0].base_stat,
    attack: obj.stats[1].base_stat,
    defense: obj.stats[2].base_stat,
    speed: obj.stats[5].base_stat,
    types: obj.types.map((t) => ({ name: t.type.name })),
    height: obj.height / 10,
    weight: obj.weight / 10,
    image: [
      ...Object.values(obj.sprites.other.dream_world),
      ...Object.values(obj.sprites.other.home),
    ].filter((url) => url),
  };
};

const searchPokemonsByPattern = async (pokeApi, pattern) => {
  const patternRegExp = new RegExp(`^${pattern}`, "i");
  const filteredPokeApi = pokeApi.filter((p) => patternRegExp.test(p.name));

  return await Promise.all(filteredPokeApi.map((p) => fetch(p.url)))
    .then((results) => Promise.all(results.map((r) => r.json())))
    .then((results) => results.map((r) => modelPokemon(r)));
};

const findPokemon = async (request, method) => {
  return await Pokemon[method]({
    ...request,
    include: [
      {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        attributes: ["username", "image"],
      },
    ],
  });
};

const getPokemons = async (name) => {
  if (name) {
    let pokeApi = await fetch(`${API}?offset=0&limit=900`);
    pokeApi = pokeApi.ok ? await pokeApi.json() : null;
    pokeApi = await searchPokemonsByPattern(pokeApi.results, name);

    let pokesCreated = await findPokemon(
      { where: { name: { [Op.startsWith]: name } } },
      "findAll"
    );

    if (pokeApi.length) return [...pokesCreated, ...pokeApi];
    else return pokesCreated;
  }

  let requestApiUrl = await fetch(`${API}?limit=40`);
  requestApiUrl = await requestApiUrl.json();

  try {
    let requests = await Promise.all([
      findPokemon({}, "findAll"),
      requestApiUrl,
    ]).then((results) => [
      ...results[0],
      ...results[1].results.map((r) => fetch(r.url).then((res) => res.json())),
    ]);

    return await Promise.all(requests).then((results) =>
      results.map((r) => (Object.keys(r).length >= 18 ? modelPokemon(r) : r))
    );
  } catch {
    throw { message: "No se encontraron pokemons", error: "notFound" };
  }
};

const getCreatedPokemons = async (email) =>
  await findPokemon({ where: { userEmail: email } }, "findAll");

const getpokemon = async (id) => {
  let errorMessage = {
    error: "notFound",
    message: `No se ha registrado ningún pokemon con el ID: ${id}`,
    id,
    notFound: true,
  };
  try {
    if (/^[a-zA-Z]{2}\d{4}$/.test(id)) {
      let result = await findPokemon({ where: { id } }, "findOne");

      if (result) return result;
      else throw new Error();
    }

    let result = await fetch(`${API}/${id}`);
    return modelPokemon(await result.json());
  } catch (e) {
    throw errorMessage;
  }
};

const postPokemon = async (data) => {
  const { types, id, name, email } = data;

  if (!id || !name || !email)
    throw { error: "cannotCreate", message: "Faltan parámetros" };

  if (!Array.isArray(types) || !types.length)
    throw {
      error: "cannotCreate",
      message: "Se necesita al menos un Type",
    };

  let user = await User.findByPk(email);

  if (!user)
    throw {
      error: "cannotCreate",
      message: "No se envió un email",
    };

  let allPokemons = await Pokemon.findAll({
    where: {
      userEmail: email,
    },
  });

  if (allPokemons.length >= 3)
    throw {
      error: "cannotCreate",
      message: "Número de pokemons creados excedido",
    };

  try {
    let pokemon = await Pokemon.create(data);

    await pokemon.addType(types);

    await user.addPokemon(id);

    let result = await findPokemon({ where: { id } }, "findOne");

    return result;
  } catch (e) {
    throw {
      error: "cannotCreate",
      message: e.parent.detail || e.errors,
      id: id,
    };
  }
};

const putPokemon = async (data) => {
  const { id, email, types, ...updates } = data;

  const pokemon = await Pokemon.findOne({
    where: { id, userEmail: email },
  });

  if (!pokemon)
    throw {
      error: "cannotUpdate",
      message: `El ID: ${id} no pertenece a ningún pokemon o dicho pokemon no pertenece al usuario ${email}`,
      email,
      id,
    };

  if (types) await pokemon.setTypes(types);

  return await pokemon.update(updates);
};

const deletePokemon = async ({ id, email }) => {
  let result = await Pokemon.destroy({
    where: { id, userEmail: email },
  });

  if (!result)
    throw {
      error: "cannotDelete",
      message: `El ID: ${id} no pertenece a ningún pokemon o dicho pokemon no pertenece al usuario ${email}`,
    };

  return { detroyed: result };
};

const deleteByAdmin = async ({ choice, identificator, blocked }) => {
  if (choice === "pokemon") {
    let destroyed = await Pokemon.destroy({ where: { id: identificator } });
    if (!destroyed)
      throw {
        error: "cannotDelete",
        message: `No existe un pokemon con el ID: ${identificator}`,
      };

    return { destroyed };
  }

  if (choice === "user") {
    if (identificator === process.env.ADMIN)
      throw {
        error: "cannotDelete",
        message: `No podés eliminar al ADMINISTRADOR`,
      };

    if (blocked === "true") await BlockedUsers.create({ email: identificator });

    await Pokemon.destroy({ where: { userEmail: identificator } });
    let destroyed = await User.destroy({ where: { email: identificator } });
    if (!destroyed)
      throw {
        error: "cannotDelete",
        message: `No existe un usuario con el email: ${identificator}`,
      };

    return { destroyed };
  }

  throw {
    error: "cannotDelete",
    message: "No se dio una elección en el choice",
  };
};

const unblockedByAdmin = async ({ email }) => {
  const destroyed = await BlockedUsers.destroy({ where: { email } });

  return { destroyed };
};

module.exports = {
  getPokemons,
  getCreatedPokemons,
  getpokemon,
  postPokemon,
  putPokemon,
  deletePokemon,
  deleteByAdmin,
  unblockedByAdmin,
};
