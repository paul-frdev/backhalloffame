import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');
const { createTestimonialModel } = require('../models/testimonialsModel');

const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const { images, description, author, dignity } = req.body;

  try {
    const response = await createTestimonialModel(images, description, author, dignity);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

module.exports = { createTestimonial };
