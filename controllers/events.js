const { response } = require('express');
const Evento = require('../models/Evento')

const obtenerEventos = async( req, res) => {
    const eventos = await Evento.find()
                              .populate('user','name') // Con el populate decimos que para el campo user traiga el name
    res.json({
        ok:true,
        eventos
    })
}

const crearEvento = async( req, res) => {
    
    try {
        const evento = new Evento(req.body)
        evento.user = req.uid
        const eventoCreado = await evento.save()
        return res.status(201).json({
            ok:true,
            Evento: eventoCreado
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg:'Hubo un error al crear el evento, comuniquese con admin'
        })
    }
    
   
}

const actualizarEvento = async( req, res) => {
    const eventoId = req.params.id;
    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento ingresado es invalido'
            })
        }
        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorizacion para actualizar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId,nuevoEvento, { new:true } ); // { new:true }  para que nos muestre el evento actualizado
        return res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, consulte al administrador'
        })
    }
}

const eliminarEvento = async ( req, res) => {
    const eventoId = req.params.id;
    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento ingresado es invalido'
            })
        }
        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorizacion para eliminar este evento'
            });
        }


        const eventoEliminado = await Evento.findByIdAndDelete(eventoId)  // { new:true }  para que nos muestre el evento actualizado
        return res.json({
            ok: true,
            msg: 'El evento fue borrado satisfactoriamente'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, consulte al administrador'
        })
    }
}


module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
