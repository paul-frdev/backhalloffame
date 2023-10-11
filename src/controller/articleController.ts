import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');
const { createArticleModel } = require('../models/articleModel');

const createNewArticle = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, images, categoryId } = req.body;

  try {
    const response = await createArticleModel(title, description, images, categoryId);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

module.exports = { createNewArticle };
