const express = require('express');
const { createNewUser, loginUser, verifyUser, authorizeUserProfile } = require('../controller/userController');
const validInfo = require('../middlewares/validInfo');
const authorize = require('../middlewares/authorize');

const authRouter = express.Router();
const loginRouter = express.Router();
const verifyRouter = express.Router();
const authorizeRouter = express.Router();

authRouter.post('/', validInfo, createNewUser);
loginRouter.post('/', validInfo, loginUser);
verifyRouter.post('/', authorize, verifyUser);
authorizeRouter.post('/', authorize, authorizeUserProfile);

module.exports = { authRouter, loginRouter, verifyRouter, authorizeRouter };
