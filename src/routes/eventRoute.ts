const { createEvent, getAllEvents, getAllPublishedEvents, getPublishedEventById } = require('../controller/eventController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const route = express.Router();

route.post('/', createEvent);
route.get('/', getAllEvents);
route.get('/scheduled', getAllPublishedEvents);
route.get('/scheduled/:id', getPublishedEventById)

module.exports = route;
