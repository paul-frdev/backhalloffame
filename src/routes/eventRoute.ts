const { createEvent, getAllEvents, getAllPublishedEvents } = require('../controller/eventController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const route = express.Router();

route.post('/', createEvent);
route.get('/', getAllEvents);
route.get('/', getAllPublishedEvents);

module.exports = route;
