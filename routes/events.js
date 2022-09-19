const {Router} = require('express');
const {check} = require('express-validator')

const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate, isGreaterThanStart } = require('../helpers/isDate');
const router = Router();

// En vez de poner el middleware validar JWT en cada una podemos ponerlo de esta forma para todos
router.use(validarJWT);

// Obtener eventos
router.get('/', obtenerEventos);

// Crear un nuevo evento
router.post('/', 
[
  check('title','El titulo es obligatorio').notEmpty(),
  check('start','Fecha de inicio es obligatoria').custom(isDate), // Custom nos permite poner nuestros propios middlewares para validar
  check('end','Fecha de finilazacion es incorrecta').custom(isDate),
  validarCampos    
]
,crearEvento);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Eliminar evento
router.delete('/:id', eliminarEvento);



module.exports = router;