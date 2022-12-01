const { json } = require("body-parser");

const { Type } = require("../../../db.js"),
  fetch = require("node-fetch"),
  API = "https://pokeapi.co/api/v2/type";

const getTypes = async () => {
  let resultDb = await Type.findAll();

  if (resultDb.length) return resultDb;

  let result = await fetch(API);
  result = await result.json();
  result = result.results.map((r, i) => ({
    id: i + 1,
    name: r.name,
  }));

  await Type.bulkCreate(result);

  return result;
};

module.exports = {
  getTypes,
};
