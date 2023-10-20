const { createEvent } = require('../controller/eventController');
const express = require('express');
const isAdmin = require('../middlewares/admin');
const authMiddleware = require('../middlewares/authMiddleware');

const route = express.Router();

route.post('/', createEvent);


module.exports = route
