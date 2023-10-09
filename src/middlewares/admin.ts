import { NextFunction, Request, Response } from 'express';
const { pool } = require('../config/dbConnect');
const asyncHandler = require('express-async-handler');

const isAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const query = 'SELECT u.first_name, r.role_name, r.permissions FROM users u JOIN roles r ON u.role_id = r.role_id WHERE u.email = $1;';

  console.log('user', user);
  
  const adminUser = await pool.query(query, [user?.email]);

  console.log('adminUser', adminUser);

  if (user?.email) {
    // throw new Error('You are not an admin');
  } else {
    next();
  }
});

module.exports = isAdmin;
