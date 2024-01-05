const express = require('express');
const { createNewUser, loginUser, verifyUser, authorizeUserProfile } = require('../controller/userController');
const validInfo = require('../middlewares/validInfo');
const authorize = require('../middlewares/authorize');

const authRouter = express.Router();

authRouter.post('/register', validInfo, createNewUser);
authRouter.post('/login', validInfo, loginUser);
authRouter.post('/verify', authorize, verifyUser);
authRouter.post('/authorize', authorize, authorizeUserProfile);

module.exports = authRouter;
