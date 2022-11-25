const { Pokemon, Type, User, BlockedUsers } = require("../../../db.js"),
  axios = require("axios"),
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
  console.log("hola");
  if (name) {
    let pokeApi = null;
    try {
      pokeApi = await axios.get(`${API}/${name}`);
    } catch {}

    console.log(pokeApi);

    let pokesCreated = await findPokemon({ where: { name } }, "findAll");

    if (pokeApi) return [...pokesCreated, modelPokemon(pokeApi.data)];
    else return pokesCreated;
  }

  try {
    let requests = await Promise.all([
      findPokemon({}, "findAll"),
      axios.get(`${API}?limit=40`),
    ]).then((results) => [
      ...results[0],
      ...results[1].data.results.map((r) => axios.get(r.url)),
    ]);

    return await Promise.all(requests).then((results) =>
      results.map((r) => (r.data ? modelPokemon(r.data) : r))
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

    let result = await axios.get(`${API}/${id}`);
    return modelPokemon(result.data);
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

  if (allPokemons.length >= 10)
    throw {
      error: "cannotCreate",
      message: "Número de pokemons creados excedido",
    };

  try {
    let pokemon = await Pokemon.create(data);
    await axios.get("http://localhost:3001/types");

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
