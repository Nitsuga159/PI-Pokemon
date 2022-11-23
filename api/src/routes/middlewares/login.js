const bcrypt = require("bcrypt");
const login = require("express").Router();
const { User } = require("../../db.js");

login.post("/", async (req, res) => {
  const { email, password } = req.body;
  const message = {
    error: "Usuario inválido",
    message: "No se pudo iniciar sesión con ese usuario",
  };
  const user = await User.findByPk(email);

  if (!user) return res.status(401).json(message);

  const comparePasswords = await bcrypt.compare(password, user.password);

  if (!comparePasswords) return res.status(401).json(message);

  res.status(200).json({
    email: user.email,
    username: user.username,
    password,
    isAdmin: user.email === process.env.ADMIN,
  });
});

module.exports = login;
