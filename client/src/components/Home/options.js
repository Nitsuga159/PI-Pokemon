const filters = {
  existingPokemons: (pokemon) => !isNaN(Number(pokemon.id)),
  createdPokemons: (pokemon) => isNaN(Number(pokemon.id)),
  types: (pokemon, type) =>
    pokemon.types.findIndex((t) => t.name === type) !== -1,
};

const sorters = {
  alphabetical: (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0),
  attack: (a, b) => b.attack - a.attack,
  defense: (a, b) => b.defense - a.defense,
  weak: (a, b) => a.attack - b.attack,
};

const options = {
  filters,
  sorters,
};

export default options;
