const {Carta} = require('../../models/cartas')

const { body, validationResult, check } = require('express-validator')


const index = async (req, res) => {
    try {
        const plato = await Carta.find()
        console.log(plato)
        // res.json({electro})
        res.render('admin/index', {platos: plato})
        
    } catch (error) {
        console.log(error)
    }
}

const create = (req, res) => {
    res.render('admin/create')
}

const edit = async (req, res) => {
    try {
        const plato = await Carta.find({_id: {$eq : req.params.id}})
        console.log(plato)
        res.render('admin/edit', { platos: plato[0], id: req.params.id, layout:'layout-admin'}  )
        
    } catch (error) {
        console.log(error)
    }
}


const update = async (req, res) => {
    const plato = await Carta.find()
    let body = req.body
    console.log(req.body)
    Carta.updateOne({_id: body.id}, {
            $set: {
            nombrePlato: body.plato,
            precio: body.precio,
            descripcion: body.descripcion,
        }

    },
    function(error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el plato',
                err
            });
            console.log(error)

        } else {
            console.log(info)
            res.redirect('/platos/index')
        }
    }

)}





const platos = async (req, res) => {

    try {
    
        const errors = validationResult(req)
        console.log(req.body, errors)

        if(errors.isEmpty()) {
            const save = new Carta({nombrePlato: req.body.plato, precio: req.body.precio, descripcion: req.body.descripcion});
                console.log(`esto es save ${save}`)
                await save.save()
                res.redirect('/platos/create')
        } else {
            console.log(req.body.mensaje)
            res.render('./platos/create', {values: req.body, errors: errors.array()})
        }

    } catch (error) {
        console.log(error)
        res.send('No se pudo Guardar el plato')
    }
}



const login = (req, res) => {
    res.render('./admin/loginAdmin')
}
module.exports = {create, platos, login, edit, index, update}