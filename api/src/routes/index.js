const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const middlewarePokemons = require("./middlewares/pokemons.js");
const middlewareTypes = require("./middlewares/type.js");
const middlewareLogin = require("./middlewares/login.js");
const middlewareRegister = require("./middlewares/register.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", middlewarePokemons);
router.use("/types", middlewareTypes);
router.use("/login", middlewareLogin);
router.use("/register", middlewareRegister);

module.exports = router;
