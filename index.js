const express = require('express');
// Para poder usar variables de entorno tenmos que instalar el paquete npm i dotenv
require('dotenv').config(); //asi lo importamos
//crear el server de express
const app = express();

//directorio publico
app.use(express.static('public'));

// lectura y parseo del body

app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));

//Escuchar peticiones
// process.env.PORT lee la variable port que definimos en el archivo .env
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})
