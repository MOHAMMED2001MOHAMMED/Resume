//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Company = require('./routes/Company')
let Orders = require('./routes/Orders')
const mongoose = require('mongoose')
    //const { Schema } = mongoose;
const Session = require('express-session')
const SessionStore = require('connect-mongodb-session')(Session)
    //const nodemailer = require('nodemailer')
const flash = require('connect-flash')
    //const helmet = require('helmet')
var app = express();
require('dotenv').config()

//

mongoose.connect(process.env.NAME_DATADASE, (err) => {
    console.log('Connect DB  ')

});


const store = new SessionStore({
    uri: process.env.NAME_DATADASE,
    collection: 'sessions'
})


app.use(require('express-session')({
    secret: process.env.SECRET_SESIOON,
    store: store,
    resave: true,
    saveUninitialized: true
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'imagess')));
//app.use(helmet())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Company', Company)
app.use('/Orders', Orders)


// catch 404 and forward to error handler
app.get('/err', (req, res, next) => {
    res.render('err')
})

app.use(function(req, res, next) {
    res.redirect('/err')
});






// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
/*
app.listen(8000, () => {
    console.log('http://localhost:8000')
})*/





module.exports = app;