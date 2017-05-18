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
        res.status(200).json(cards);
      })
      .catch(error => res.status(400).json({error: err}));
  })
  .post(middleWare.userPermission, (req, res) => {
    Card.create(req.body)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json({error:'Failed to post new card, please try again'}));
  });

cards.delete('/:id', middleWare.userPermission, (req, res) => {
  Card.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(res.status(200).json({success: true}))
  .catch(error => res.status(400).json({error:'Failed to delete card'}));
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
  .then(card => res.status(200).json(card[1].dataValues))
  .catch(error => res.status(400).json({error:'Failed to update card'}));
});

module.exports = cards;