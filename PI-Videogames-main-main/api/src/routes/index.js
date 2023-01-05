const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require('./videogames');
const genres = require('./genres');
const platforms = require('./platforms');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame',videogames);
router.use('/genres', genres);
router.use('/platforms', platforms);
//module.exports = router;
module.exports = router;