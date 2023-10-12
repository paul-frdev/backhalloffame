import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');
const { createArticleModel, getALlArticlesModel, getArticleIdModel } = require('../models/articleModel');

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

const getAllArticles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getArticles = await getALlArticlesModel();

    return res.json(getArticles);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

const getAllArticleById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const articleById = await getArticleIdModel(id);

    console.log('articleById', articleById);

    return res.json(articleById);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

module.exports = { createNewArticle, getAllArticles, getAllArticleById };
