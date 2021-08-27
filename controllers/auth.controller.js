const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const { correo, password } = req.body;
    
    try {
    
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        
        
        // Verificar si el usuario está activo
        if ( !usuario.status ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo: false'
            });
        }
        
        
        // Verificar la contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        
        
        // Generar JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            token
        });
    
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const validarToken = async( req, res = response ) => {

    const { uid } = req;
    
    // Leer la base de datos
    // const dbUser = await Usuario.findById(uid);
    
    // Generar un nuevo JWT
    const token = await generarJWT( uid );
    
    return res.json({
        ok: true,
        token
    })

}

module.exports = {
    login,
    validarToken
};
