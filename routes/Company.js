var express = require('express');
var router = express.Router();
const { Login, getlogin, Signup, getsignup, logout } = require('../controller/Company.C')
const { isCompany, notCompany } = require('./check/checkcompany')
const { notuser } = require('./check/checkuser')
const passport = require('passport')
const { company_google } = require('../models/Company.M')



router.get('/Signup', notuser, notCompany, getsignup)
router.post('/Signup', notuser, notCompany, Signup)

router.get('/login', notuser, notCompany, getlogin)
router.post('/login', notuser, notCompany, Login)

router.get('/logout', notuser, isCompany, logout)


module.exports = router;