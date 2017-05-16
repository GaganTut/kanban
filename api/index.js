/*jshint esversion: 6*/
const express = require('express');
const api = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const saltRounds = 10;
const bcrypt = require('bcrypt');
const { User } = require('../models');

api.use(session({
  store: new RedisStore(),
  secret: 'this_is_my_long_but_not_too_long_secret_whatever',
  resave: false,
  saveUninitialized: true
}));

api.use(passport.initialize());
api.use(passport.session());

passport.use(new LocalStrategy (
  (username, password, done) => {
    User.findOne({
      where: {
        username: username
      }})
      .then ( user => {
        if (user === null) {
          return done(null, false, {message: 'Login Failed - Wrong Input'});
        } else {
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'Login Failed - Wrong Input'});
            }
          });
        }
      })
      .catch(err => {
        console.log('error: ', err);
      });
    }
));

passport.serializeUser(function(user, done) {
  console.log('serializing');
                              // ^ ---------- given from authentication strategy
  // building the object to serialize to save
  return done(null, {
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
                                 // ^ ---------- given from serializeUser
  User.findOne({
    where: {
      username: user.username
    }
  }).then(user => {
    return done(null, user); // <------- inserts into the request object
  });
});

api.use('/cards', require('./cardAPI'));
api.use('/user', require('./userAPI'));

module.exports = api;