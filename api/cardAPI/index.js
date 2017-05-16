/*jshint esversion: 6*/
const express = require('express');
const cards = express.Router();
const { Card, User } = require('../../models');
const middleWare = require('../customMiddleWare');

cards.route('/')
  .get((req, res) => {
    Card.findAll({
      include: [
        {
          model: User,
          as: 'Creator',
          attributes: ['username', 'firstname', 'lastname']
        },
        {
          model: User,
          as: 'Assigned',
          attributes: ['username', 'firstname', 'lastname']
        }
      ]
    })
      .then( cards => {
        res.json(cards);
      })
      .catch(err => {
        res.send(err);
      });
  })
  .post(middleWare.userPermission, (req, res) => {
    Card.create(req.body)
      .then(data => res.json(data))
      .catch(err => {
        res.json(err);
      });
  });

cards.delete('/:id', middleWare.userPermission, (req, res) => {
  Card.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(res.json({success: true}))
  .catch(err => {
    res.send(err);
  });
});


cards.put('/:id', middleWare.userPermission, (req, res) => {
  Card.update(req.body,
    {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    }
  )
  .then(card => res.json(card[1].dataValues))
  .catch(err => {
    res.send(err);
  });
});

module.exports = cards;