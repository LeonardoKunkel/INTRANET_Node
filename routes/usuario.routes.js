const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuarioGet,
        usuarioPost,
        usuarioPut,
        usuarioDelete } = require('../controllers/usuario.controller');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet);

router.get('/:id', usuarioGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/:id', usuarioDelete);

module.exports = router;
