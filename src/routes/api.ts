const express = require('express');
const { authRouter, loginRouter, verifyRouter, authorizeRouter } = require('./authRoutes');
const blogCategoryRouter = require('./blogRoutes');
const articleRouter = require('./articleRoutes');
const colorsRouter = require('./colorsRouters');
const weightsRouter = require('./weightsRoutes');
const sizeRouter = require('./sizesRoutes');

const imgRouter = require('./uploadImgRoutes');

const api = express.Router();

//auth, login
api.use('/register', authRouter);
api.use('/login', loginRouter);
api.use('/verify', verifyRouter);
api.use('/', authorizeRouter);

// blog,
api.use('/api/blog-category', blogCategoryRouter);

//articles
api.use('/api/article', articleRouter);

//images
api.use('/api/image', imgRouter);

//colors
api.use('/api/color', colorsRouter);

//weights
api.use('/api/weight', weightsRouter);

// sizes
api.use('/api/size', sizeRouter);

module.exports = api;
