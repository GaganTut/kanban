/*jshint esversion: 6*/
const express = require('express');
const boards = express.Router();
const { Card, User, Board } = require('../../models');
const middleWare = require('../customMiddleWare');

boards.route('/')
  .get((req, res) => {
    Board.findAll({
      where: [
        {

        }
      ]
    });
  });