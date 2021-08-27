const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImage } = require('../controllers/uploads.controller');

const validarArchivo = require('../middlewares/validar-archivo');

const router = Router();

router.post( '/', validarArchivo, cargarArchivo );

router.put('/:id', [
    validarArchivo,
    check('id', 'El id debe ser de mongo').isMongoId()
], actualizarImagen );

router.get('/:id', [
    check('id', 'El id debe ser de mongo').isMongoId()
], mostrarImage)

module.exports = router;
