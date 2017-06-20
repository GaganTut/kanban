/*jshint esversion: 6*/
const express = require('express');
const boards = express.Router();
const { Card, User, Board, BoardUser } = require('../../models');
const middleWare = require('../customMiddleWare');

boards.route('/')
  .get((req, res) => {
    User.findOne({
      where: {
        email: req.user.email
      },
      include: [
        {
          model: Board,
          include: [
            {
              model: User,
              attributes: ['email']
            }
          ]
        }
      ]
    })
    .then(user => res.json({success: true, boards: user.Boards}))
    .catch(error => res.json({success: false, error}));
  })
  .post((req, res) => {
    Board.create({title: req.body.title})
      .then(newBoard => {
        BoardUser.create(
          {
            BoardId: newBoard.id,
            UserEmail: req.user.email,
            permission: 'Owner'
          }
        )
        .then(joinBoard => Board.findOne({
          where: {
            id: newBoard.id
          }
        }))
        .then(board => res.json({success: true, board}));
      })
      .catch(error => res.json({success: false, error: 'Board could not be created'}));
  })
  .put((req, res) => {
    BoardUser.create(req.body)
    .then(res.json({success: true}));
  });

boards.route('/:id')
  .get((req, res) => {
    Card.findAll({
      where: {
        attachedTo: req.params.id
      }
    })
    .then(cards => res.json({success: true, cards}))
    .catch(error => res.json({success: false}));
  });

module.exports = boards;