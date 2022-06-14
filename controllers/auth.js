const { response } = require('express')


// En este archivo estan los funciones que tenemos que ejecutar en los endpoints

const crearUsuario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Registro'
    })
}

const loginUsuario = (req,res = response)=>{
    res.json({
        ok: true,
        msg: "Login"
    })
}

const revalidarToken = (req,res = response)=>{
    res.json({
        ok: true,
        msg: "Revalidar token "
    })
}




module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}

// seria crearUsuario: crearUsuario pero ecmascript nos permite poner solo crearUsuario