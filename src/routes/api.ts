const express = require('express');
const { authRouter, loginRouter, verifyRouter, authorizeRouter } = require('./authRoutes');
const blogCategoryRouter = require('./blogRoutes');

const api = express.Router();

//auth, login
api.use('/register', authRouter);
api.use('/login', loginRouter);
api.use('/verify', verifyRouter);
api.use('/', authorizeRouter);

// blog, articles
api.use('/api/blog-category', blogCategoryRouter);

module.exports = api;
