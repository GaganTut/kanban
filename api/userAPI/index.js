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
      attributes: ['email', 'fullname']
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
        fullname: req.body.fullname,
        email: req.body.email,
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
  console.log(req.user);
  res.redirect(`/api/user/${req.user.id}`);
});



user.get('/check', (req, res) => {
  if(req.isAuthenticated()) {
    User.findOne({
      where: {
        email: req.user.email
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

user.route('/:id')
  .get((req, res) => {
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['email', 'fullname']
    })
      .then(user => {
        res.json({success: true, user});
      })
      .catch(error => res.json({succes: false, error:'Failed to find user'}));
  })
  .put(middleWare.userPermission, (req, res) => {
    Card.update(req.body,
      {
        where: {
          email: req.params.email
        }
      }
    )
      .then(res.json({success: true}))
      .catch(error => res.json({success: false, error:'Failed to update user'}));
  })
  .delete(middleWare.userPermission, (req, res) => {
    Card.destroy(
      {
        where: {
          email: req.params.email
        }
      }
    )
    .then(res.json({success: true}))
    .catch(error => res.json({error:'Failed to delete user'}));
  });

module.exports = user;