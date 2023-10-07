import { Request, Response } from 'express';
const { createUser, currentUser, authorize } = require('../models/userModel');
const { pool } = require('../config/dbConnect');
const bcrypt = require('bcrypt');
const { jwtGenerator, parseJwt, generateRefreshToken } = require('../utils/index.ts');

const createNewUser = async (req: Request, res: Response) => {
  const { firstName, email, mobilePhone, password } = req.body;

  try {
    const curUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (curUser.length > 0) {
      return res.status(401).json('User already exist!');
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser(firstName, email, mobilePhone, bcryptPassword);
    const jwtToken = jwtGenerator(newUser.user_id);

    return res.json({ jwtToken });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const curUser = await currentUser(email);

    if (curUser.length === 0) {
      return res.status(401).json('Invalid Credential');
    }

    const validPassword = await bcrypt.compare(password, curUser.user_password);

    if (!validPassword) {
      return res.status(401).json('Invalid Credential');
    }

    const jwtToken = jwtGenerator(curUser.user_id);

    return res.json({ jwtToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const verifyUser = async (req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const authorizeUserProfile = async (req: Request, res: Response) => {
  const userId = parseJwt(req.headers.jwt_token);

  try {
    const curUser = await authorize(userId.user.id);

    res.json(curUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

module.exports = { createNewUser, loginUser, verifyUser, authorizeUserProfile };
