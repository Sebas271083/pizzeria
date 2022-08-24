const express = require('express');
const router = express.Router();
const {Carta} = require('../../models/cartas')

const {check} = require('express-validator');


const controller = require('../../controllers/admin/platos');

router.get('/platos/index', controller.index)
router.get('/platos/create', controller.create )

router.get('/platos/:id/edit', controller.edit)
router.put('/platos/update/', controller.update)



router.post('/platos/create', [
    check('plato')
        .exists()
        .withMessage('El nombre es obligatorio')
        .isLength(3)
        .withMessage('El nombre debe ser mayor a 3 caracteres')
        .escape(),
    check('precio')
        .exists()
        .withMessage('El precio es obligatorio')
        .isLength(1)
        .withMessage('El precio es obligatorio')
        .escape(),
    check('descripcion')
        .exists()
        .withMessage('La descripción es obligatoria')
        .isLength(10)
        .withMessage('La descripción debe tener al menos 10 caracteres')
], controller.platos)

router.get('/admin/login', controller.login )



module.exports = router