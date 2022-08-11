const {Schema, model} = require ('mongoose');

const EventoSchema = Schema({
  title:{
    type: String,
    require: true
  },  
  notes:{
    type: String,
  } ,
  start:{
    type: String,
    require: true
  },
  end:{
    type: String,
    require: true
  },
  user:{ // Se hace una referencia al modelo usuario que creamos antes
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }

});

// Exportamos el modelo a usar con el la configuracion del SCHEMA
module.exports = model('Evento', EventoSchema );
