const express = require('express');
const { createNewUser } = require('../controller/userController');

const usersRouter = express.Router();

usersRouter.post('/', createNewUser);

module.exports = { usersRouter };
