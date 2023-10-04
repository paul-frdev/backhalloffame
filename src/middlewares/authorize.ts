import { NextFunction, Request, Response } from 'express';
require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = function (req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const token = req.header('jwt_token');

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: 'authorization denied' });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.params.user = verify.user;

    next();
    
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
