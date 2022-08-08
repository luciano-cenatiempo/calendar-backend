const {Schema, model} = require ('mongoose');

// Es como la estructura del objeto de informacion que vamos a mandar a la base de datos. 
const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }

});

// Exportamos el modelo a usar con el la configuracion del SCHEMA
module.exports = model('Usuario', UsuarioSchema );
