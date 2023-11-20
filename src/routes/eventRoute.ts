const {
  createEvent,
  getAllEvents,
  getAllPublishedEvents,
  getPublishedEventById,
  getTimeOptions,
  deleteEventById,
} = require('../controller/eventController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const route = express.Router();

route.post('/', createEvent);
route.get('/', getAllEvents);
route.get('/published', getAllPublishedEvents);
route.get('/published/:id', getPublishedEventById);
route.delete('/:id', deleteEventById);
route.get('/time-options', getTimeOptions);

module.exports = route;
