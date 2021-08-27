const { Router } = require('express');
const { check } = require('express-validator');

const  validarCampos  = require('../middlewares/validar-campos');

const { login, validarToken } = require('../controllers/auth.controller');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();


router.post('/login', [
    check('correo', 'El correo obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.get('/renew', validarJWT, validarToken);

module.exports = router;
