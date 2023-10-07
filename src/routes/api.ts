const express = require('express');
const { authRouter, loginRouter, verifyRouter, authorizeRouter } = require('./authRoutes');

const api = express.Router();

api.use('/register', authRouter);
api.use('/login', loginRouter);
api.use('/verify', verifyRouter);
api.use('/', authorizeRouter);

module.exports = { api };
