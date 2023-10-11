const express = require('express');
const { authRouter, loginRouter, verifyRouter, authorizeRouter } = require('./authRoutes');
const blogCategoryRouter = require('./blogRoutes');

const uploadImgRouter = require('./uploadImgRoutes');

const api = express.Router();

//auth, login
api.use('/register', authRouter);
api.use('/login', loginRouter);
api.use('/verify', verifyRouter);
api.use('/', authorizeRouter);

// blog,
api.use('/api/blog-category', blogCategoryRouter);

//articles
api.use('/api/articles', blogCategoryRouter);

//images
api.use('/api/upload-image', uploadImgRouter);

module.exports = api;
