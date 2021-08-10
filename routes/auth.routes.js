const { Router } = require('express');
const { check } = require('express-validator');

const  validarCampos  = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('correo', 'El correo obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );


// router.post('/login', [], login)


module.exports = router;
