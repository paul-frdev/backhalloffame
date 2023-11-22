const { createSlide, getSlides, deleteSlideId, getSlideById, updateSlide, updateIsActiveSlide } = require('../controller/slidesController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const route = express.Router();

route.post('/', createSlide);
route.get('/', getSlides);
route.get('/:id', getSlideById);
route.get('/active/:id', updateIsActiveSlide);
route.delete('/:id', deleteSlideId);
route.put('/:id', updateSlide);

module.exports = route;
