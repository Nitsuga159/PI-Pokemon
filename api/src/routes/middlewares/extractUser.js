const bcrypt = require("bcrypt");
const { User } = require("../../db.js");

module.exports = async (req, res, next) => {
  const password = await bcrypt.hash(req.body.password, 8);

  try {
    const user = await User.findOne({
      where: {
        password,
      },
    });

    if (!user) throw new Error();
  } catch (e) {
    return res.status(401).json({
      error: "No authorization",
      message: "No tienes acceso a este método",
    });
  }

  next();
};
