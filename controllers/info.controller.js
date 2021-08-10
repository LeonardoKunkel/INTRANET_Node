const { response } = require('express');
const Info = require('../models/info.model');

const obtenerInfo = async( req, res = response ) => {

    const { id } = req.params;
    const info = await Info.findById( id ).populate('usuario', 'cel', 'empresa', 'sexo', 'estado', 'fecha', 'curp', 'calle', 'colonia', 'municipio', 'edo', 'cp', 'img');
    
    res.json( info )

}

const crearInfo = async( req, res = response ) => {
    
    const { usuario, ...body } = req.body;
    
    
    
}

module.exports = {
    obtenerInfo
}
