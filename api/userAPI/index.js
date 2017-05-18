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
        res.status(200).json(user);
      })
      .catch(error => res.status(400).json({error}));
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
      })
      .catch(error => res.status(400).json({error:'Create User Failed'}));
    });
  });
});

user.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect(`/api/user/${req.user.username}`);
});

user.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({success: true});
});

user.route('/:username')
  .get((req, res) => {
    User.findOne({
      where: {
        username: req.params.username
      },
      attributes: ['username', 'firstname', 'lastname']
    })
      .then(userInfo => {
        res.status(200).json(userInfo);
      })
      .catch(error => res.status(400).json({error:'Failed to find user'}));
  })
  .put(middleWare.userPermission, (req, res) => {
    Card.update(req.body,
      {
        where: {
          username: req.params.username
        }
      }
    )
      .then(res.status(200).json({success: true}))
      .catch(error => res.status(400).json({error:'Failed to update user'}));
  })
  .delete(middleWare.userPermission, (req, res) => {
    Card.destroy(
      {
        where: {
          username: req.params.username
        }
      }
    )
    .then(res.status(200).json({success: true}))
    .catch(error => res.status(400).json({error:'Failed to delete user'}));
  });

module.exports = user;