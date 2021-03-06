/*jshint esversion: 6*/
const express = require('express');
const cards = express.Router();
const { Card, User } = require('../../models');
const middleWare = require('../customMiddleWare');

cards.route('/board/:boardID')
  .get(middleWare.boardAccess, (req, res) => {
    Card.findAll({
      include: [
        {
          model: User,
          as: 'Creator',
          attributes: ['email', 'fullname']
        }
      ],
      where: {
        attachedTo: req.params.boardID
      }
    })
      .then( cards => {
        res.json({success: true, cards});
      })
      .catch(error => res.json({success: false, error: 'Could not load cards, try again'}));
  })
  .post(middleWare.hasAccess, middleWare.postPermission, (req, res) => {
    req.body.createdBy = req.user.email;
    Card.create(req.body)
      .then(card => res.json({success: true, card}))
      .catch(error => res.json({success: false, error:'Failed to post new card, please try again'}));
  });

cards.delete('/:id', middleWare.cardPermission, (req, res) => {
  Card.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(res.json({success: true}))
  .catch(error => res.json({success: false, error:'Failed to delete card'}));
});


cards.put('/:id', middleWare.cardPermission, (req, res) => {
  Card.update(req.body,
    {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    }
  )
  .then(card => res.json({success: true, card: card[1].dataValues}))
  .catch(error => res.json({error:'Failed to update card'}));
});

module.exports = cards;