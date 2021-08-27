const path = require('path');
const fs = require('fs');

const { response } = require('express');
const subirArchivo = require('../helpers/subir-archivo');

const Usuario = require('../models/usuario.model');

const cargarArchivo = async(req, res = response) => {
    
    try {
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        const nombre = await subirArchivo( req.files, undefined, 'img' );
        res.json({ nombre });
    
    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const actualizarImagen = async(req, res = response) => {

    const { id } = req.params;
    
    let modelo = await Usuario.findById(id);
    
    if ( !modelo ) {
        return res.status(400).json({
            msg: `There is no user with the id ${ id }`
        });
    }
    
    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImage = path.join( __dirname, '../uploads', modelo.img );
        if ( fs.existsSync( pathImage ) ) {
            fs.unlinkSync( pathImage );
        }
    }
    
    const nombre = await subirArchivo( req.files, undefined );
    modelo.img = nombre;
    
    await modelo.save();
    
    res.json( modelo );

}


const mostrarImage = async( req, res = response ) => {

    const { id } = req.params;
    
    let modelo = await Usuario.findById(id);
    
    if ( !modelo ) {
        return res.status(400).json({
            msg: `There is no user with the id ${ id }`
        });
    }
    
    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImage = path.join( __dirname, '../uploads', modelo.img );
        if ( fs.existsSync( pathImage ) ) {
            return res.sendFile( pathImage )
        }
    }
    
    const pathImage = path.join( __dirname, '../assets/user.png' );
    res.sendFile( pathImage );
    
    // const nombre = await subirArchivo( req.files, undefined );
    // modelo.img = nombre;
    
    // await modelo.save();
    
    // res.json( modelo );

}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImage
}

