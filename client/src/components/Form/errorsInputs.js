const idRegExp = /^[a-zA-Z]{2}\d{4}$/;
const nameRegExp = /^[a-zA-Z]{4}.*$/;
const imageRegExp = /^https?:\/\/.+$/;

function idValidation(id) {
  if (!id) return "El ID es requerido.";

  if (!idRegExp.test(id)) return "El ID debe cumplir con el formato.";
}

function nameValidation(name) {
  if (!name) return "El nombre es requerido.";

  if (!nameRegExp.test(name))
    return "El nombre debe empezar al menos con 4 letras.";

  if (name.length > 15) return "No puede tener más de 15 caracteres.";
}

function hpValidation(hp) {
  if (!hp) return "La vida es requerida.";
  if (+hp < 1 || +hp > 150) return "La vida debe estar entre el rango 1 - 150.";
}

function attackValidation(attack) {
  if (+attack < 1 || +attack > 150)
    return "El ataque debe estar entre el rango 1 - 150.";
}

function defenseValidation(defense) {
  if (+defense < 1 || +defense > 150)
    return "La defensa debe estar entre el rango 1 - 150.";
}

function speedValidation(speed) {
  if (+speed < 1 || +speed > 150)
    return "La velocidad debe estar entre el rango 1 - 150.";
}

function heightValidation(height) {
  if (+height < 0.1 || +height > 5)
    return "La altura debe estar entre el rango 0.1 - 5.";
}

function weightValidation(weight) {
  if (+weight < 1 || +weight > 200)
    return "El peso debe estar entre el rango 1 - 200.";
}

function imageValidation(image) {
  if (!imageRegExp.test(image))
    return "La URL debe tener el formato solicitado.";

  if (image.length > 300) return "No debe tener más de 300 caracteres.";
}

function typeValidation(type) {
  if (!type.length) return "Debe tener al menos un tipo.";
}

const errorInputs = ({
  id,
  name,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  image,
  types,
}) => {
  let error = {};

  error.id = idValidation(id);
  error.name = nameValidation(name);
  error.hp = hpValidation(hp);
  error.attack = attack && attackValidation(attack);
  error.defense = defense && defenseValidation(defense);
  error.speed = speed && speedValidation(speed);
  error.height = height && heightValidation(height);
  error.weight = weight && weightValidation(weight);
  error.types = types && typeValidation(types);
  error.image = image && image[0] && imageValidation(image);

  return error;
};

export default errorInputs;
