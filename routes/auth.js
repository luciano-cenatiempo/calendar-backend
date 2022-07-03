/*
    RUtas de usuarios / Auth
    host + /api/auth
 */


const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
    '/new',
    [ 
        //middlewares
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email','El email es invalido').isEmail(),
        check('password','La contraseña debe tener almenos 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
     crearUsuario);

router.post(
    '/',
    [
        //middlewares
        check('email', 'El email ingresado es invalido').isEmail(),
        check('password','El password debe tener almenos 6 caracteres').isLength({min: 6}),
        validarCampos // llamamos al middleware validarcampos despues de un check
    ],
     loginUsuario);

router.get('/renew', revalidarToken)

module.exports = router;