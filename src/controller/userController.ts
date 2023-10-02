import { Request, Response } from 'express';
const { createUser } = require('../models/userModel');

const createNewUser = async (req: Request, res: Response) => {
  const { firstName, email, mobile, password } = req.body;
  try {
    const newUser = await createUser(firstName, email, mobile, password);
    res.json(newUser);
  } catch (error) {
    console.log('error', error);

    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewUser };
