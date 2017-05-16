/*jshint esversion: 6*/
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
        res.send(200).json(user);
      })
      .catch(res.status(400));
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
        res.status(200).json(
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

user.post('/user/login', passport.authenticate('local', {
  successRedirect: '/api/user/success',
  failureaRedirect: '/api/user/failure'
}));

user.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ success: true });
});

user.get('/success', (req, res) => {
  res.status(200).json({success: true});
});


user.delete('/:username', middleWare.userPermission, (req, res) => {
  Card.destroy(
    {
      where: {
        username: req.params.username
      }
    }
  )
  .then(res.status(200).json({success: true}))
  .catch(res.status(400));
});


user.put('/:username', middleWare.userPermission, (req, res) => {
  Card.update(req.body,
    {
      where: {
        username: req.params.username
      }
    }
  )
  .then(res.status(200).json({success: true}))
  .catch(res.status(400));
});

user.get('/:username', (req, res) => {
  User.findOne({
    where: {
      username: req.params.username
    },
    attributes: ['username', 'firstname', 'lastname']
  })
    .then(userInfo => {
      res.status(200).json(userInfo);
    })
    .catch(res.status(400));
});

module.exports = user;