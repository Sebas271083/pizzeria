const express = require('express');
const router = express.Router();

const controller = require('../../controllers/principal')

const session = require('express-session');
//Configuracion express-session
router.use(session({
    secret:'4qWGN?~hX{&p{Lk*',
    resave: false,
    saveUninitialized: false
}))

const isLoginDelivery = (req, res, next) => {
  if(!req.session.user_id ) {
      res.redirect('/auth/login')
  }
  next()
}



/* GET home page. */
router.get('/', (req, res) => {
  const usuario = req.session.email
  res.render('index', {user: usuario});
});

router.get('/nosotros', (req, res) => {
  res.render('nosotros');
});

router.get('/nuestroMenu', controller.nuestroMenu);

router.get('/galeria', (req, res) => {
  res.render('galeria');
});

router.get('/delivery', isLoginDelivery, (req, res) => {
  res.render('delivery');
});
router.post('/delivery', controller.enviarDelivery)

module.exports = router;