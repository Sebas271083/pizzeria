const express = require('express');
const router = express.Router();
const { body, validationResult, check} = require('express-validator');

const controllerAuth = require('../../controllers/auth/auth');

router.get('/auth/login', controllerAuth.ingresar)
router.post('/auth/login', controllerAuth.ingreso)

router.get('/logout', controllerAuth.salir)

router.get('/auth/registro', controllerAuth.registrar)

router.get('/auth/cerrarSesion', controllerAuth.cerrarSesion)

router.post('/auth/registro', [
    check('nombreRegistro')
        .exists()
        .withMessage('El mensaje es obligatorio')
        .isLength(5)
        .withMessage('El nombre debe ser mayor a 5 caracteres')
        .escape(),
    check('emailRegistro')
        .exists()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Debe introducir un email valido')
        .escape(),
    check('passwordRegistro')
        .exists()
        .withMessage('La contraseña es obligatoria')
        .isLength(8)
        .withMessage('La Contraseña debe tener al menos 8 caracteres')
        .escape(),

], controllerAuth.registro)

module.exports = router;
