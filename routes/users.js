var express = require('express');
var router = express.Router();
const { Login, Signup, getLogin, getSignup, cvuser, insertdata, logout, profile, profileUser } = require('../controller/Users.C')
const { isDatacv, isuser, notuser, isAdmin, Admin } = require('./check/checkuser')
const { isCompany, notCompany } = require('./check/checkcompany')
const { check, validationResult } = require('express-validator')
const multer = require('multer')
const passport = require('passport')
const { login_google } = require('../models/Users.M')
require('../controller/user-google')
    /* GET users listing. */

//router.get('/login', notuser, notCompany, getLogin)
router.get('/login-users', notuser, notCompany, getLogin)
router.post('/login', notuser, notCompany,
    check('Email').not().isEmpty().withMessage('The Email is Empty'),
    check('Password').isLength({ min: 5 }).withMessage('Enter more than 5 items'),
    (req, res, next) => {
        if (validationResult(req).array().length >= 1) {
            req.flash('Elogin', validationResult(req).array())
            res.redirect('/users/login-users')
        } else next()
    },
    notuser, Login)

router.get('/Signup-user', notuser, notCompany, getSignup)
router.post('/Signup', notCompany, notuser,
    check('cemail').not().isEmpty().withMessage('The CEmail is Empty'),
    check('Age').not().isEmpty().withMessage('The Age is Empty'),
    check('cemail').custom((value, { req }) => {
        if (value === req.body.email) return true
        else return Promise.reject('The email entered does not match');
    }),
    check('password').isLength({ min: 5 }).withMessage('Enter more from 5 element in password'),
    check('cpassword').isLength({ min: 5 }).withMessage('Enter more from 5 element in cpassword'),
    check('cpassword').custom((value, { req }) => {
        if (value === req.body.password) return true
        else return Promise.reject('The Password entered does not match');
    }), (req, res, next) => {
        if (validationResult(req).array().length >= 1) {
            req.flash('ESignup', validationResult(req).array())
            res.redirect('/users/Signup-user')
        } else next()
    }, notuser, Signup)

router.get('/Profile-user', isAdmin, isuser, isDatacv, profile)

router.get('/Profile/:id', Admin, profileUser)

router.get('/cvuser', isAdmin, isuser, cvuser)

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, '')
    }
})

const upload = multer({ storage }).single('image')

router.post('/cvuser', upload, isuser,
    check('FirstName').not().isEmpty().withMessage('The FirstName is Empty'),
    check('LastNmae').not().isEmpty().withMessage('The LastNmae is Empty'),
    check('SpecialtyPublic').not().isEmpty().withMessage('The SpecialtyPublic is Empty'),
    check('Department').not().isEmpty().withMessage('The Department is Empty'),
    check('Specialization').not().isEmpty().withMessage('The Specialization is Empty'),
    check('Nationality').not().isEmpty().withMessage('The Nationality is Empty'),
    check('Domicile').not().isEmpty().withMessage('The Domicile is Empty'),
    check('Address').not().isEmpty().withMessage('The Address is Empty'),
    check('City').not().isEmpty().withMessage('The City is Empty'),
    check('Mobile').not().isEmpty().withMessage('The Mobile is Empty'),
    check('Experience').not().isEmpty().withMessage('The Experience is Empty'),
    check('Skills').not().isEmpty().withMessage('The Skills is Empty'),
    check('CertificateName').not().isEmpty().withMessage('The CertificateName is Empty'),
    check('CommentCertificate').not().isEmpty().withMessage('The CommentCertificate is Empty'),
    check('employeetime').not().isEmpty().withMessage('The employeetime is Empty'),
    check('languages').not().isEmpty().withMessage('The languages is Empty'), (req, res, next) => {
        console.log(validationResult(req).array());
        if (validationResult(req).array() == []) {
            req.flash('ErrCvuser', validationResult(req).array())
            res.redirect('/users/cvuser');
        } else {
            next()
        }

    }, insertdata)

router.get('/logout', isuser, logout)



router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

router.get('/Resum-google',
    passport.authenticate('google', {
        failureRedirect: '/users/login'
    }), async(req, res, next) => {
        console.log(req.user, 'ssssssssreqqqqquserrrrr');

        let login = await login_google(req.user)
        console.log(login);
        req.session.userId = login._id
        req.session.FirstName = login.FirstName
        req.session.isDataCV = login.isDataCV
        req.session.imageuser = login.imageuser
        req.session.isAdmin = login.isAdmin
        if (login.isDataCV == true) {
            res.redirect('/')
        } else {
            res.redirect('/users/cvuser')
        }

    });





module.exports = router;