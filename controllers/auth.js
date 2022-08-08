const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/Usuario");
const { generarJWT } = require('../helpers/jwt'); 

// En este archivo estan los funciones que tenemos que ejecutar en los endpoints

const crearUsuario = async (req, res = response) => {
  const {  email, password } = req.body;

  try {

    let usuario = await Usuario.findOne({email}) // busca en la bd un usuario donde email:email 
    
    // Si existe el usuario entonces devuelve el error
    if(usuario){
      return res.status(400).json({
        ok: false,
        msg: 'El email ya está en uso para otro usuario'
      });
    }
    
    usuario = new Usuario(req.body); // Instancia al usuario con body del request

    // Encryptar contraseña
    const salt = bcrypt.genSaltSync(); // genera un salt con 10 vueltas por defecto para encriptar contra
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save(); // Guarda en la base de datos. 

    // Generar JWT
    const token = await generarJWT(usuario.uid, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error) // Esto se muestra por consola del server
    res.status(500).json({
      ok: false,
      msg: 'Ocurrio un error, consulte al administrador.'
    })
    
  }
};

const loginUsuario = async (req, res = response) => {
  const { password, email } = req.body;

  try {

    const usuario = await Usuario.findOne({email});

    if(!usuario){
      return res.status(400).json({
        ok:false,
        msg:'El usuario o la contraseña son invalidos, reintente.'
      });
    }
    

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);
    

    if (!validPassword){
      return res.status(400).json({
        ok: false,
        msg:'El usuario o la contraseña son invalidos, reintente.'
      });
    }

    // Generar nuestro JWT
    const token = await generarJWT(usuario.uid, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name:usuario.name,
      token
    });
    
  } catch (error) {
    console.log(error) 
    res.status(500).json({
      ok: false,
      msg: 'Ocurrio un error, consulte al administrador.'
    });
    
  }
  
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
