const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const handlebars = require('express-handlebars')
const cors = require('cors');

module.exports = (app) => {

    // app.engine('.hbs', handlebars({
    //     defaultLayout: 'main.hbs'
    // }))
    //app.set('view engine', '.hbs')
    //app.use(express.static('public'))
    //app.use(bodyParser.urlencoded({ extended: true }))

    app.use(cors());
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    app.use(cookieParser())
    app.use(session({
        secret: 'neshto-taino!@#$%',
        resave: false,
        saveUninitialized: false
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
            if (req.user.roles.includes('Admin')) {
                res.locals.isAdmin = true;
            }
        }
        next()
    })

    app.use((error, req, res, next) => {
        const status = error.statusCode || 500;
        const message = error.message;
        res.status(status).json({message: message});
        next();
    });

    console.log('Express ready!')
}
