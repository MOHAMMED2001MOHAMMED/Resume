const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const { login_google } = require('../models/Users.M')
require('dotenv').config()

passport.use(new GoogleStrategy({
        clientID: process.env.clientID_USER,
        clientSecret: process.env.clientSecret_USER,
        callbackURL: "https://resume-cv-jal.herokuapp.com/users/Resum-google",
        passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        await login_google(profile)
        return done(null, profile)
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});