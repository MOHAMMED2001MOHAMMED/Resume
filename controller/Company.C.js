const { SignupCampany, LoginCampany } = require('../models/Company.M')

const Login = (req, res, next) => {
    console.log(req.body)
    LoginCampany(req.body).then(data => {

        req.session.Companyid = data.id
        req.session.NameCampny = data.NameCampny

        res.redirect('/')
    }).catch(err => {
        req.flash('loginCompany', err)
        console.log(err)
        res.redirect('/Company/login')
    })
}

const getlogin = (req, res, next) => {
    //console.log(req.flash('loginCompany'))
    let e = req.flash('loginCompany')

    res.render('loginC', {
        e: e
    })
}


const Signup = (req, res, next) => {

    SignupCampany(req.body).then(user => {
        res.redirect('/Company/login')
    }).catch(err => {
        req.flash('SignupCompany', err)

        res.redirect('/Company/Signup')
    })
}



const getsignup = (req, res, next) => {
    let Err = req.flash('SignupCompany')
    res.render('SignupC', {
        Err: Err
    })
}

const logout = (req, res, next) => {

    req.session.destroy((err) => {

        res.redirect('/Company/login')
    })
}

module.exports = {
    Login,
    Signup,
    getlogin,
    getsignup,
    logout
}