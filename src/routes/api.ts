const express = require('express');
const { authRouter, loginRouter, verifyRouter, authorizeRouter } = require('./authRoutes');
const blogCategoryRouter = require('./blogRoutes');
const articleRouter = require('./articleRoutes');
const colorsRouter = require('./colorsRouters');
const weightsRouter = require('./weightsRoutes');
const sizeRouter = require('./sizesRoutes');

const imgRouter = require('./uploadImgRoutes');
const productRouter = require('./productRoutes');
const brandRouter = require('./brandRoutes');
const productCategoryRouter = require('./productCategoriesRoutes');

const api = express.Router();

//auth, login
api.use('/register', authRouter);
api.use('/login', loginRouter);
api.use('/verify', verifyRouter);
api.use('/', authorizeRouter);

// blog,
api.use('/api/blog-category', blogCategoryRouter);
api.use('/api/article', articleRouter);

// product
api.use('/api/color', colorsRouter);
api.use('/api/weight', weightsRouter);
api.use('/api/size', sizeRouter);
api.use('/api/product', productRouter);
api.use('api/brand', brandRouter);
api.use('api/category', productCategoryRouter);

//upload images
api.use('/api/image', imgRouter);

module.exports = api;
