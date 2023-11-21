import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');
const {
  createArticleModel,
  getBlogArticlesModel,
  getArticleIdModel,
  deleteArticleModel,
  getALlPublishedArticlesModel,
  getMediaArticlesModel,
} = require('../models/articleModel');

const createNewArticle = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, images, categoryId, publishDate, articleType } = req.body;

  try {
    const response = await createArticleModel(title, description, images, categoryId, publishDate, articleType);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const getBlogArticles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getArticles = await getBlogArticlesModel();

    return res.json(getArticles);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

const getMediaArticles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getArticles = await getMediaArticlesModel();

    return res.json(getArticles);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

const getAllPublishedArticles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getArticles = await getALlPublishedArticlesModel();

    return res.json(getArticles);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

const getArticleById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const articleById = await getArticleIdModel(id);

    return res.json(articleById);
  } catch (error) {
    console.log('error');
    throw new Error(error);
  }
});

const deleteArticleById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteArticleModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createNewArticle, getBlogArticles, getArticleById, deleteArticleById, getAllPublishedArticles, getMediaArticles };
