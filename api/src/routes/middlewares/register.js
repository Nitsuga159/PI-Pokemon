const bcrypt = require("bcrypt");
const register = require("express").Router();
const { User, BlockedUsers } = require("../../db.js");

register.post("/", async (req, res) => {
  const { email, username, password, image, apiKey } = req.body;

  try {
    if (!email || !username || !password || apiKey !== process.env.SECRET)
      return res.status(400).json({
        error: "No se pudo registrar",
        message: "Faltan parámetros obligatorios",
      });

    const blockedEmail = await BlockedUsers.findOne({ where: { email } });

    if (blockedEmail)
      return res.status(400).json({
        error: "No se pudo registrar",
        message: "El correo ha sido Bloqueado",
        email,
      });

    const user = await User.findByPk(email);

    if (user)
      return res.status(400).json({
        error: "No se pudo registrar",
        message: "Ese correo ya se encuentra registrado",
        email,
      });

    const createUser = await User.create({
      email,
      username,
      password: await bcrypt.hash(password, 8),
      image,
    });

    res.status(201).json({ email, username, password });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

module.exports = register;
