const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');

const router = Router();

// En vez de poner el middleware validar JWT en cada una podemos ponerlo de esta forma para todos
// router.use(validarJWT);

// Obtener eventos
router.get('/', validarJWT, obtenerEventos);

// Crear un nuevo evento
router.post('/', validarJWT, crearEvento);

// Actualizar evento
router.put('/:id', validarJWT, actualizarEvento);

// Eliminar evento
router.delete('/:id', validarJWT, eliminarEvento);



module.exports = router;