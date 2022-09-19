
// La funcion isDate va a validar que sea una fecha. Los argumentos deben pasarse de esta manera segun la documentacion de express validator
const moment = require('moment');

const isDate = (value, { req, location, path }) => {
  if(!value){
    return false;
  }

  const fecha = moment( value );
  if ( fecha.isValid()){
    return true;
  } else {
    return false;
  }
}

// const isGreaterThanStart = (value,{req}) =>{
//   if(!value || req.body.end){
//     return false;
//   }

//   const fechaFinal = moment( value );
//   const fechaInicio = moment( req.body.start );
//   console.log(fechaInicio)
//   console.log(fechaFinal)
//   if(fechaFinal.isBefore(fechaInicio)){
//     console.log('es menor')
//     return false
//   }
//   return true ;
// }


module.exports = { isDate }