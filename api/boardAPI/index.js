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
    .catch(error => res.json({success: false, error: "No User Found"}));
  })
  .post(middleWare.hasAccess, (req, res) => {
    Board.create({title: req.body.title})
      .then(newBoard => {
        BoardUser.create(
          {
            BoardId: newBoard.id,
            UserEmail: req.user.email,
            permission: 'Owner'
          }
        )
          .then(() => {
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
              .then(user => res.json({success: true, boards: user.Boards}));
          });
      })
      .catch(error => res.json({success: false, error: 'Board could not be created'}));
  });

  boards.route('/:boardID')
  .put(middleWare.boardPermission, (req, res) => {
    BoardUser.create(req.body)
    .then(res.json({success: true}))
    .catch(error => res.json({success: false, error: 'Board could not be updated'}));
  });

module.exports = boards;