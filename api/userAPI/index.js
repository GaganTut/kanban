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
      .then( users => {
        res.json({success: true, users});
      })
      .catch(error => res.json({success: false, error: "Could not get all users"}));
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
      .then(user => {
        res.json(
          {success: true, user}
        );
      })
      .catch(error => res.json({error:'Create User Failed'}));
    });
  });
});

user.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect(`/api/user/${req.user.username}`);
});

user.get('/check', (req, res) => {
  if(req.isAuthenticated()) {
    User.findOne({
      where: {
        username: req.user.username
      }
    })
    .then(user => res.json({success: true, user}));
  } else {
    res.json({success: false});
  }
});

user.get('/logout', (req, res) => {
  req.logout();
  res.json({success: true});
});

user.route('/:username')
  .get((req, res) => {
    User.findOne({
      where: {
        username: req.params.username
      },
      attributes: ['username', 'firstname', 'lastname']
    })
      .then(user => {
        res.json({success: true, user});
      })
      .catch(error => res.json({error:'Failed to find user'}));
  })
  .put(middleWare.userPermission, (req, res) => {
    Card.update(req.body,
      {
        where: {
          username: req.params.username
        }
      }
    )
      .then(res.json({success: true}))
      .catch(error => res.json({error:'Failed to update user'}));
  })
  .delete(middleWare.userPermission, (req, res) => {
    Card.destroy(
      {
        where: {
          username: req.params.username
        }
      }
    )
    .then(res.json({success: true}))
    .catch(error => res.json({error:'Failed to delete user'}));
  });

module.exports = user;