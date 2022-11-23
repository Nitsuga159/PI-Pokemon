const errors = {
  cannotDelete(err, res) {
    return res.status(400).json({ error: err.error, message: err.message });
  },
  cannotUpdate(err, res) {
    return res.status(400).json({
      error: err.error,
      message: err.message,
      notFound: true,
      email: err.email,
      idPokemon: err.idPokemon,
    });
  },
  cannotCreate(err, res) {
    return res.status(400).json({
      error: err.error,
      message: err.message,
      notFound: true,
      id: err.id,
    });
  },
  notFound(err, res) {
    return res.status(404).json({
      error: err.error,
      message: err.message,
      notFound: true,
      id: err.id,
    });
  },
  default(res) {
    return res
      .status(404)
      .json({ error: "default", message: "No se pudo realizar la petición" });
  },
};

module.exports = (e, res) =>
  errors[e.error] ? errors[e.error](e, res) : errors.default(res);
