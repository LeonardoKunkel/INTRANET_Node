const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Usuario = require('../models/usuario.model');

const coleccionesPermitidas = [
    'usuarios',
    'empresas',
    'status',
    'roles'
];


const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );
    
    if ( esMongoID ) {
        const usuario = await Usuario.findById( termino );
        res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }
    
    const regex = new RegExp( termino, 'i' );
    
    const usuarios = await Usuario.findById({
        $or: [{ nombre: regex, status: true }, { correo: regex }],
        $and: [{ status: true }]
    });
    
    res.json({
        results: usuarios
    });

}


// const buscarEmpresas = async( termino = '', res = response ) => {

//     const esMongoID = ObjectId.isValid( termino );
    
//     if ( esMongoID ) {
//         const usuario = await Usuario.findById( termino );
//         res.json({
//             results: ( usuario ) ? [ usuario ] : []
//         });
//     }
    
//     const regex = new RegExp( termino, 'i' );
    
//     const empresas = await Usuario.findById({
//         $or: [{ nombre: regex }, { empresa: regex }]
//     });
    
//     res.json({
//         results: empresas
//     });

// }



const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;
    
    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }
    
    if ( coleccion ) {
        buscarUsuarios( termino, res )
    } else {
        res.status(500).json({
            msg: 'Se le olvidó hacer esta búsqueda'
        });
    }
    
    // switch ( coleccion ) {
    //     case 'usuarios':
    //         buscarUsuarios( termino, res )
    //     break;
    //     case 'empresas':
            
    //     break;
    //     case 'status':
    
    //     break;
        
    //     default:
    //         res.status(500).json({
    //             msg: 'Se le olvidó hacer esta búsqueda'
    //         });
    // }

}

module.exports = {
    buscar
}
