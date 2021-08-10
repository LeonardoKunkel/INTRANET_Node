const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');

const usuariosGet = async( req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
        .skip(Number( desde))
        .limit(Number( limite ))
    ]);
    
    res.json({
        total,
        usuarios
    });

}


const usuarioGet = async( req, res = response ) => {

    const { id } = req.params;
    
    res.json({
        msg: 'Usuario obtenido',
        id
    });

}

const usuarioPost = async( req, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );
    
    await usuario.save();
    
    res.json({
        usuario
    })

}

const usuarioPut = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;
    
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync( password, salt );
    }
    
    const usuario = await Usuario.findByIdAndUpdate( id, resto )
    
    res.json( usuario );

}

const usuarioDelete = async( req = request, res = response ) => {

    const { id } = req.params;
    
    // Físicamente borrado
    // const usuario = await Usuario.findByIdAndDelete( id );
    
    const usuario = await Usuario.findOneAndUpdate( id, { status: false } );
    
    res.json({ usuario })

}

module.exports = {
    usuariosGet,
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}
