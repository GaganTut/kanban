const express = require('express');
const api = express.Router();

api.use('/cards', require('./cardAPI'));
api.use('/user', require('./userAPI'));

module.exports = api;