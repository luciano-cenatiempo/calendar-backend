const {Schema, model} = require ('mongoose');

const EventoSchema = Schema({
  title:{
    type: String,
    required: true
  },  
  notes:{
    type: String,
  } ,
  start:{
    type: String,
    required: true
  },
  end:{
    type: String,
    required: true
  },
  user:{ // Se hace una referencia al modelo usuario que creamos antes
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }

});

// Para editar el json que responde el modelo, de manera que se vea id y no _id y que no se vea __v
EventoSchema.method('toJSON', function(){
  const {_id, __v, ...object} = this.toObject();
  object.id = _id;
  return object;
})

// Exportamos el modelo a usar con el la configuracion del SCHEMA
module.exports = model('Evento', EventoSchema );
