const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const controller = require('../../controllers/principal')
const { body, validationResult, check } = require('express-validator')
const ejs = require('ejs')


router.get('/contacto', (req, res) => {
    res.render('contacto', {values: {} });
  });

router.get('/formEnviado', (req, res) => {
    res.render('formEnviado')
})



router.post('/contacto', [
    body('nombre', 'El nombre es obligatorio y debe tener 3 caracteres como minimo')
        .exists().isLength(3).escape(),
    body('email', 'El correo es obligatorio')
        .exists().isEmail().normalizeEmail(),
    // body('mensaje', 'El mensaje es obligatorio').exists().notEmpty()
    check('mensaje')
        .exists()
        .notEmpty()
        .withMessage('El mensaje es obligatorio')
        .isLength(5)
        .withMessage('El mensaje debe tener mas de 5 caracteres')
        .trim().escape(),
    check('telefono')
        .trim()
        .escape()
    
], controller.enviarForm
)



  module.exports = router;
