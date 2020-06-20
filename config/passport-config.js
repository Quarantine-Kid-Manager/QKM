const { authenticate } = require('passport');
var bcrypt = require('bcrypt');
var db = require('../models');

var LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
    var authenticateUser = async (email, password, done) => {
        var user = await db.User.findOne({where: {email_address: email}});
        
        console.log(`authenticate email: ${user.email_address} password ${user.password}`);
        if (user == null) {
            console.log('Email not found');
            return done(null, false, {message: "User not found"});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                console.log('Password Incorrect');
                return done(null, false, {message: "Password incorrect"});
            }
        } catch(err) {
            return done(err);
        }
    }
    passport.use(new LocalStrategy({usernameField: "email"}, authenticateUser));
    passport.serializeUser((user, done)=>{});
    passport.deserializeUser((id, done) => {});
}

module.exports = initialize;