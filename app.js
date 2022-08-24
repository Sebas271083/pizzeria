const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {dbConnection} = require('./db/db');
const methodOverride = require('method-override');



const app = express();
const session = require('express-session');
//Configuracion express-session
app.use(session({
    secret:'4qWGN?~hX{&p{Lk*',
    resave: false,
    saveUninitialized: false
}))


const indexRouter = require('./routes/principal/index');



app.set('view engine', 'ejs')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const isLogin = (req, res, next) => {
    if(!req.session.user_id ) {
        res.redirect('/auth/login')
    } else if (req.session.email !== "sebdelgado83@gmail.com") {
        res.redirect('/auth/login')
    }
        console.log(req.session.user_id)

        console.log(req.session.email)
    next();
}



app.use('/', indexRouter);
app.use(require('./routes/principal/contacto'));
app.use(require('./routes/auth/login'));
app.use('/',isLogin ,require('./routes/admin/admin'));





const port = 5000;

app.listen(port, () =>{
    console.log(`Conectado al puerto ${port}`)
})

dbConnection()
module.exports = app;
