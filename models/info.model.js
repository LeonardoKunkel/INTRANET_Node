const { Schema, model } = require('mongoose');

const InfoSchema = Schema({
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    cel: {
        type: Number,
        required: [true, 'El número de celular es obligatorio']
    },
    empresa: {
        type: String,
        required: [true, 'La empresa es obligatoria']
    },
    sexo: {
        type: String,
        required: [true, 'El género es obligatorio']
    },
    estado: {
        type: Boolean,
        required: [true, 'El estado civil es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    curp: {
        type: String,
        required: [true, 'El CURP es obligatorio']
    },
    calle: {
        type: String,
        required: [true, 'La calle es obligatoria']
    },
    colonia: {
        type: String,
        required: [true, 'La colonia es obligatoria']
    },
    municipio: {
        type: String,
        required: [true, 'El municipio es obligatorio']
    },
    edo: {
        type: String,
        required: [true, 'El estado es obligatorio']
    },
    cp: {
        type: String,
        required: [true, 'El código postal es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    img: {
        type: String
    },
});

module.exports = model('Info', InfoSchema);
