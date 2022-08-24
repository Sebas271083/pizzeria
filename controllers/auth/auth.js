const { body } = require('express-validator')
const {UsuarioPizzeria} = require('../../models/usuariosPizzeria')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs');



const ingresar = (req, res) => {     
    res.render('auth/login')
}

const ingreso = async (req, res) => {
    try {
       const usuarioLogin = await UsuarioPizzeria.find({email: {$eq : req.body.email}})

        if(usuarioLogin.length == 0) {
            res.send('Email y/o contraseña incorrecta');
        } else if (await bcryptjs.compare(req.body.password, usuarioLogin[0].password) == false) {
            res.send('Email y/o contraseña incorrecta');
        } else{
            req.session.user_id = usuarioLogin[0]._id
            req.session.email = usuarioLogin[0].email
            console.log(`req.session = ${req.session.user_id}`)
            console.log(`req.session = ${req.session.email}`)
            
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
    }


}

const salir = (req, res) => {
    req.session.destroy(() => res.redirect('/api/'))
}

const cerrarSesion = (req, res) => {
    req.session.destroy(()=> res.redirect('/'))
}

const registrar = (req, res) => {
    res.render('auth/registro')
}

const registro = async (req, res) => {

        try {
                const hash = await bcryptjs.hash(req.body.passwordRegistro, 8);

            const errors = validationResult(req);

            if(errors.isEmpty()) {
                const save = new UsuarioPizzeria({nombre: req.body.nombreRegistro, email: req.body.emailRegistro, password: hash});
                console.log(`esto es save ${save}`)
                await save.save()
                res.redirect('/')
            } else {
                res.render('auth/registro', { values:req.body, errors: errors.array()})

            // res.status(501).json({msg: "No se puede registrar el Usuario", error})
            }

        } catch (error) {
        
            const usuario = await UsuarioPizzeria.find({email: {$eq : req.body.emailRegistro}}) 
            const mailDuplicado = 'El mail ya se encuentra registrado'
                if(usuario) {
                    res.render('auth/registro', { values:req.body, mailDuplicado})
        }
            
    }

        

    
        
    }


    // connection.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], async (error, results)=> {
        //     if(error) {throw error}
            
        //     if(results.length == 0) {
        //         res.send('El correo y/o contraseña es incorrecto')
        //     } else if ( (await bcryptjs.compare(req.body.password, results[0].password)) === false) {
        //         res.send('El correo y/o contraseña es incorrecto')
        //     } else {
        //         req.session.user_id = results[0].id
    
        //         res.redirect('/')
        //     }
        // })
    



module.exports = {ingresar, registrar, ingreso, salir, registro, cerrarSesion}
