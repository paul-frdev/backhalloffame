const express = require('express');
const { createNewUser, loginUser, verifyUser } = require('../controller/userController');
const validInfo = require('../middlewares/validInfo');
const authorize = require('../middlewares/authorize');

const authRouter = express.Router();
const loginRouter = express.Router();
const verifyRouter = express.Router();

authRouter.post('/', validInfo, createNewUser);
loginRouter.post('/', validInfo, loginUser);
verifyRouter.post('/', authorize, verifyUser);

module.exports = { authRouter, loginRouter, verifyRouter };
