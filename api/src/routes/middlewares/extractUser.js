const bcrypt = require("bcrypt");
const { User } = require("../../db.js");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new Error();

    const verificatePassword = await bcrypt.compare(password, user.password);

    if (!verificatePassword) throw new Error();
  } catch (e) {
    return res.status(401).json({
      error: "No authorization",
      message: "No tienes acceso a este método",
    });
  }

  next();
};
