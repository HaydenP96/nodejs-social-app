const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../config/database');
const mongoose = require('mongoose');
const User = mongoose.models.User;
const validPassword = require('./password').validPassword;

const settings = {
  passReqToCallback: true,
};

const verifyCallback = (req, username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false, req.flash('user', 'Incorrect Email.'));
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false, req.flash('password', 'Incorrent Password.'));
      }
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
};

const strategy = new LocalStrategy(settings, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
