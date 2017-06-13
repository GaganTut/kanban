/*jshint esversion: 6*/
const express = require('express');
const boards = express.Router();
const { Card, User, Board, BoardUser } = require('../../models');
const middleWare = require('../customMiddleWare');

boards.route('/')
  .get((req, res) => {
    BoardUser.findAll({
      where: [
        {
          UserUsername: req.user.username
        }
      ]
    })
    .then(boards => res.json({success: true, boards}))
    .catch(error => res.json({success: false, error}));
  })
  .post((req, res) => {
    Board.create({title: req.body.title})
      .then(board => {
        BoardUser.create({BoardId: board.id, UserUsername: req.user.username, permission: 'Admin'})
        .then(res.json({success: true, board}));
      })
      .catch(error => res.json({success: false, error: 'Board could not be created'}));
  })
  .put((req, res) => {
    BoardUser.create(req.body)
    .then(res.json({success: true}));
  });

module.exports = boards;