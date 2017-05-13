const path = require('path');
const express = require('express');

//passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// session
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// password hashing
const saltRounds = 10;
const bcrypt = require('bcrypt');

//sequelize
const db = require('./models');
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 8888;

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json({extended: true}));
app.use(require('method-override')('_method'));

app.use(session({
  store: new RedisStore(),
  secret: 'this_is_my_long_but_not_too_long_secret_whatever',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

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
  return done(null, {
    username: user.username,
    firstname: user.firstname
  });
});

passport.deserializeUser(function(user, done) {
  User.findOne({
    where: {
      username: user.username
    }
  }).then(user => {
    return done(null, {
      username: user.username,
      firstname: user.firstname
    });
  });
});

app.use('/api', require('./api'));
app.use(express.static('public'));


//db.sequelize.sync({force:true});

app.listen(PORT, () => {

});