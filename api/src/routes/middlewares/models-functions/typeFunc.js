const { Type } = require("../../../db.js"),
  axios = require("axios"),
  API = "https://pokeapi.co/api/v2/type";

const getTypes = async () => {
  let resultDb = await Type.findAll();

  if (resultDb.length) return resultDb;

  let result = await axios.get(API);
  result = result.data.results.map((r, i) => ({
    id: i + 1,
    name: r.name,
  }));

  await Type.bulkCreate(result);

  return result;
};

module.exports = {
  getTypes,
};
