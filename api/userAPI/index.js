const express = require('express');
const user = express.Router();
const { Card, User } = require('../../models');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const passport = require('passport');
const middleWare = require('../customMiddleWare');

user.route('/')
  .get((req, res) => {
    User.findAll({
      attributes: ['username', 'firstname', 'lastname']
    })
      .then( user => {
        res.json(user);
      })
      .catch(err => {
        res.send(err);
      });
  });

user.post('/new', middleWare.validateNewUser, (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hash
      })
      .then((user) => {
        res.json(
          {
            "firstname": user.firstname,
            "lastname": user.lastname,
            "username": user.username,
          }
        );
      });
    });
  });
});


user.delete('/:username', middleWare.userPermission, (req, res) => {
  Card.destroy(
    {
      where: {
        username: req.params.username
      }
    }
  )
  .then(res.json({success: true}))
  .catch(err => {
    res.send(err);
  });
});


user.put('/:username', middleWare.userPermission, (req, res) => {
  Card.update(req.body,
    {
      where: {
        username: req.params.username
      }
    }
  )
  .then(res.json({success: true}))
  .catch(err => {
    res.send(err);
  });
});

user.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect(`/api/user/${req.body.username}`);
});

user.get('/:username', (req, res) => {
  User.findOne({
    where: {
      username: req.params.username
    },
    attributes: ['username', 'firstname', 'lastname']
  })
    .then(userInfo => {
      res.json(userInfo);
    })
    .catch(console.log);
});

user.get('/logout', (req, res) => {
  console.log(req.isAuthenticated());
  req.logout();
  console.log(req.isAuthenticated());
  res.json({success: true});
});

module.exports = user;