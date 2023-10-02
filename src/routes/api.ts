const express = require('express');
const { usersRouter } = require('./authRoutes');

const api = express.Router();

api.use('/users', usersRouter);

module.exports = { api };
