const express = require('express');
const { authRouter, loginRouter, verifyRouter } = require('./authRoutes');

const api = express.Router();

api.use('/register', authRouter);
api.use('/login', loginRouter);
api.use('/verify', verifyRouter);

module.exports = { api };
