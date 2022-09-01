const { signup, login, InsertData, getProfile } = require('../models/Users.M')
const { validationResult } = require('express-validator')
const { getcategorys } = require('../models/Controller.M')
const AWS = require('aws-sdk')
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport')
const getSignup = (req, res, next) => {

    res.render('Signup', {
        ErrSignup: req.flash('ErrSignup'),
        ESignup: req.flash('ESignup')

    })
}

const Signup = (req, res, next) => {


    signup(req.body).then(resulte => {
        req.session.userId = resulte._id,
            req.session.isDataCV = resulte.isDataCV
        res.redirect('/users/cvuser')
    }).catch(err => {
        req.flash('ErrSignup', err)
        res.redirect('/users/Signup-user')
    })
}

const getLogin = (req, res, next) => {
    const e = req.flash('Errlogin')
    const ee = req.flash('Elogin')
    res.render('login', {
        Err: e,
        Er: ee
    })

}

const Login = (req, res, next) => {

    login(req.body).then(resulte => {

        req.session.userId = resulte.id
        req.session.FirstName = resulte.FirstName
        req.session.isDataCV = resulte.isDataCV
        req.session.imageuser = resulte.imageuser
        req.session.isAdmin = resulte.isAdmin

        res.redirect('/users/profile-user')

    }).catch(err => {

        req.flash('Errlogin', err)
        res.redirect('/users/login-users')
    })
}

const s3 = new AWS.S3({
    accessKeyId: process.env.KEY_AWS,
    secretAccessKey: process.env.Secret_AWS,
    //signatureVersion: '4',
    //region: 'us-east-1'
})



const insertdata = async(req, res, next) => {
    let images
    console.log(req.body)
    console.log(req.file);

    const images1 = async() => {
        try {
            if (req.file == undefined) {
                InsertData(req.body, 'https://jalhoom2001.s3.amazonaws.com/muhammad.jpg-1661944816421.jpg').then(data => {
                    req.session.FirstName = data.FirstName
                    req.session.isDataCV = data.isDataCV
                    req.session.imageuser = data.imageuser
                    res.redirect('/users/profile-user')
                }).catch(err => {
                    console.log(err)
                })
            } else {
                let myfile = req.file.originalname.split(".")
                console.log(myfile);
                const filetype = myfile[myfile.length - 1]
                console.log(filetype);

                let params = {
                    Bucket: 'jalhoom2001',
                    Key: `${req.file.originalname}-${Date.now()}.${filetype}`,
                    Body: req.file.buffer
                }
                console.log(params);
                // console.log(uuidv4());

                s3.upload(params, (err, doc) => {
                    if (err) {

                        console.log('err', err);
                    } else {


                        console.log('doc', doc);


                        console.log(req.body, 'req.body');

                        InsertData(req.body, doc.Location).then(data => {
                            console.log(data)
                            req.session.FirstName = data.FirstName
                            req.session.isDataCV = data.isDataCV
                            req.session.imageuser = data.imageuser
                            res.redirect('/users/profile-user')
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                })

            }
        } catch (err) {
            console.log(err);
        }
    }


    await images1()
}


const cvuser = async(req, res, next) => {
    try {
        let getcate = await getcategorys()
        let arr = []
        for (let i = 0; i < getcate.length; i++) {
            arr.push(getcate[i].department)
        }
        let arr1 = []
        for (let i = 0; i < arr.length; i++) {
            for (let e = 0; e < arr.length; e++) {
                if (arr1.length == 0) {
                    arr1.push(arr[e])
                } else if (!arr1.includes(arr[e])) {
                    arr1.push(arr[e])

                }
            }
        }
        console.log(req.session)
        res.render('cvuser', {
            isUser: req.session.userId,
            department: arr1,
            getcate: getcate,
            ErrCvuser: req.flash('ErrCvuser')

        })
    } catch (err) {
        console.log(err)
    }
}

const logout = (req, res, next) => {
    console.log('Mmmmmmmm')
    req.session.destroy((err) => {
        res.redirect('/users/login-users')
    })
}

const profile = (req, res, next) => {

    getProfile(req.session.userId).then(user => {
        console.log(user)
        res.render('profile', {
            user: user,
            image: req.session.imageuser,
            isAdmin: req.session.isAdmin
        })
    }).catch(err => {
        console.log(err)
    })

}

const profileUser = async(req, res, next) => {
    try {
        let user = await getProfile(req.params.id)
        res.render('profile', {
            user: user,
            image: 'req.session.imageuser',
            isAdmin: req.session.isAdmin
        })
    } catch (err) {
        console.log(err)
    }
}







module.exports = {
    Signup,
    Login,
    getLogin,
    getSignup,
    insertdata,
    cvuser,
    logout,
    profile,
    profileUser
}