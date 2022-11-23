const createInputsValues = (pokemon, type, types) => {
  if (!types) return {};

  const map = {
    UPDATE: (key) => {
      if (key === "image") return pokemon[key] ? pokemon[key][0] : "";

      if (key === "types")
        return pokemon[key].map((p) => types.find((t) => t.name === p.name).id);

      return pokemon[key] ? pokemon[key] : "";
    },
    CREATE: (key) => (key === "types" ? [] : ""),
  };

  return {
    id: map[type]("id"),
    name: map[type]("name"),
    hp: map[type]("hp"),
    attack: map[type]("attack"),
    defense: map[type]("defense"),
    speed: map[type]("speed"),
    height: map[type]("height"),
    weight: map[type]("weight"),
    types: map[type]("types"),
    image: map[type]("image"),
  };
};

export default createInputsValues;
