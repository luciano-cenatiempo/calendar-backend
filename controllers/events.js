const { response } = require('express');

const obtenerEventos = ( req, res) => {
    res.json({
        ok:true,
        msg: 'Obtener Eventos'
    })
}

const crearEvento = ( req, res) => {
    res.json({
        ok:true,
        msg: 'Crear Evento'
    })
}

const actualizarEvento = ( req, res) => {
    res.json({
        ok:true,
        msg: 'actualizar Eventos'
    })
}

const eliminarEvento = ( req, res) => {
    res.json({
        ok: true,
        msg: 'Eliminar Evento'
    })
}


module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}