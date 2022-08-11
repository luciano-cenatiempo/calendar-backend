const jwt = require('jsonwebtoken');
const {response} = require('express');


const validarJWT = (req, res = response, next) => {
    // x-token viene del header
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        //  se verifica que para ese token el payload sea exactamente igual al que fue generado, puede fallar si expiro
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        // Se asigna los valores a la req para pasarlas a la siguiente funcion con NEXT
        req.uid = payload.uid
        req.name = payload.name
        console.log(req.uid)
        
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}


module.exports = {
    validarJWT
}