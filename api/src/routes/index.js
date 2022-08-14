const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const recipeRoute = require('./recipe.routes')
const dietRoute = require('./diet.routes')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRoute)
router.use('/diet', dietRoute)

module.exports = router;
