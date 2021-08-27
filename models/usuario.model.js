const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    puesto: { type: String },
    cel: { type: Number },
    empresa: { type: String },
    genero: { type: String },
    estado: { type: Boolean },
    fecha: { type: String },
    curp: { type: String },
    calle: { type: String },
    colonia: { type: String },
    municipio: { type: String },
    edo: { type: String },
    cp: { type: Number },
    img: { type: String },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );
