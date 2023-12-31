const express = require('express');
const authRouter = require('./authRoutes');
const blogCategoryRouter = require('./blogRoutes');
const articleRouter = require('./articleRoutes');
const colorsRouter = require('./colorsRouters');
const weightsRouter = require('./weightsRoutes');
const sizeRouter = require('./sizesRoutes');
const eventRouter = require('./eventRoute');
const ticketRouter = require('./ticketRoutes');

const imgRouter = require('./uploadImgRoutes');
const productRouter = require('./productRoutes');
const brandRouter = require('./brandRoutes');
const productCategoryRouter = require('./productCategoriesRoutes');
const tagsRouter = require('./tagsRoutes');
const slidesRouter = require('./slidesRoutes');
const testimonialRouter = require('./testimonialRoutes');
const contentRouter = require('./contentRoutes');

const { errorHandler, notFound } = require('../middlewares/errorHandler');

const api = express.Router();

//auth, login
api.use('/api', authRouter);

// product
api.use('/api/product', productRouter);
api.use('/api/category', productCategoryRouter);
api.use('/api/color', colorsRouter);
api.use('/api/weight', weightsRouter);
api.use('/api/size', sizeRouter);
api.use('/api/brand', brandRouter);

//upload images
api.use('/api/image', imgRouter);

//events
api.use('/api/event', eventRouter);

// ticketImages
api.use('/api/ticket', ticketRouter);

//tags
api.use('/api/tags', tagsRouter);

// slides
api.use('/api/slides', slidesRouter);

// testimonials
api.use('/api/testimonial', testimonialRouter);

// content
api.use('/api', contentRouter);

// blog,
api.use('/api/blog-category', blogCategoryRouter);
api.use('/api', articleRouter);

//handlers
api.use(notFound);
api.use(errorHandler);

module.exports = api;
