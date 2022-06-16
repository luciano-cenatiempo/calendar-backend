const { response } = require("express");
const { validationResult} = require('express-validator');

// En este archivo estan los funciones que tenemos que ejecutar en los endpoints

const crearUsuario = (req, res = response) => {
  const { name, email, password } = req.body;


  // Manejo de errores
  const errors = validationResult( req );
  if(!errors.isEmpty()){
    return res.status(400).json({
        ok: false,
        errors: errors.mapped()
    })
  }
  
  res.status(201).json({
    ok: true,
    msg: "Registro",
    name,
    email,
    password,
  });
};

const loginUsuario = (req, res = response) => {
  const { password, email } = req.body;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
        ok: false,
        errors: errors.mapped()
    })
  }
  res.json({
    ok: true,
    msg: "Login",
    email,
    password
  });
};

const revalidarToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Revalidar token ",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};

// seria crearUsuario: crearUsuario pero ecmascript nos permite poner solo crearUsuario
