/*
    RUtas de usuarios / Auth
    host + /api/auth
 */


const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

router.post(
    '/new',
    [ 
        //middlewares
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email','El email es invalido').isEmail(),
        check('password','La contraseña debe tener almenos 6 caracteres').isLength({ min:6 })
    ],
     crearUsuario);

router.post(
    '/',
    [
        //middlewares
        check('email', 'El email ingresado es invalido').isEmail(),
        check('password','El password debe tener almenos 6 caracteres').isLength({min: 6})
    ],
     loginUsuario);

router.get('/renew', revalidarToken)

module.exports = router;