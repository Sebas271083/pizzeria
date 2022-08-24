const express = require('express');
const nodemailer = require('nodemailer');
const ejs = require('ejs')
const {Carta} = require('../models/cartas')
const dotenv = require('dotenv')


dotenv.config();

const { body, validationResult, check } = require('express-validator')


module.exports.nuestroMenu = async (req, res) => {
    try {
        const menu = await Carta.find()
        console.log("el menu:" + menu)
        res.render('nuestroMenu', {platos: menu})
    } catch (error) {
        console.log(error)
    }
}


module.exports.enviarForm = (req, res)=> {
    const errors = validationResult(req)
    console.log(req.body, errors)
    const enviado = {enviado: 'Enviado'}

    if(errors.isEmpty()) {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port:2525,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        ejs.renderFile(__dirname + '/../views/correo.ejs', { body: req.body }, (error, html) => {
        console.log(`process.env.PASS ${process.env.PASS}`)
            
            if(error) { throw error}

            const options = {
                from: req.body.email,
                to: 'correo@correo.com',
                subject: 'Nodemailer',
                html: html
            }

        transporter.sendMail(options,(error, info) => {
            if (error) {throw error}

            console.log(info)
        })
    })    

        res.render('./formEnviado', {values: req.body})


    } else {
        // res.render('/contacto', {values: req.body, errors: errors.array()})
        console.log(req.body.mensaje)
        res.render('./contacto', {values: req.body, errors: errors.array()})
    }
}

// module.exports.enviarForm = (req, res) => {
//     console.log(req.body)
//     res.send('Enviando...')
// }

module.exports.enviarDelivery = (req, res) => {
    res.render('delivery')
}