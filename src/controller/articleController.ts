import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const {
  createArticleModel,
  getBlogArticlesModel,
  getArticleIdModel,
  deleteArticleModel,
  getALlPublishedArticlesModel,
  getMediaArticlesModel,
  getMediaArticleIdModel,
} = require("../models/articleModel");

const createNewArticle = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, images, categoryId, publishDate, articleType } =
    req.body;

  try {
    const response = await createArticleModel(
      title,
      description,
      images,
      categoryId,
      publishDate,
      articleType,
    );

    return res.json(response);
  } catch (error) {
    console.error("error", error);
    throw new Error(error);
  }
});

const getBlogArticles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getArticles = await getBlogArticlesModel();

    return res.json(getArticles);
  } catch (error) {
    console.error("error");

    throw new Error(error);
  }
});

const getMediaArticles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const articles = await getMediaArticlesModel();

    console.log('articles', articles);
    
    const formattedArticles = articles.map((item: any) => ({
      id: item.article_id,
      title: item.title,
      image: item.images,
      status: item.status,
      cat_title: item.article_type,
      created_at: item.created_at,
      publish_date: item.publish_date,
      description: item.description,
    }));

    return res.json(formattedArticles);
  } catch (error) {
    console.error("error");

    throw new Error(error);
  }
});

const getMediaArticleById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const articleById = await getMediaArticleIdModel(id);

      const formattedArticle = {
        id: articleById.article_id,
        title: articleById.title,
        image: articleById.images,
        created_at: articleById.created_at,
        description: articleById.description,
      };

      return res.json(formattedArticle);
    } catch (error) {
      console.error("error");
      throw new Error(error);
    }
  },
);

const getAllPublishedArticles = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const getArticles = await getALlPublishedArticlesModel();

      return res.json(getArticles);
    } catch (error) {
      console.error("error");

      throw new Error(error);
    }
  },
);

const getArticleById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const articleById = await getArticleIdModel(id);

    return res.json(articleById);
  } catch (error) {
    console.error("error");
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

module.exports = {
  createNewArticle,
  getBlogArticles,
  getArticleById,
  deleteArticleById,
  getAllPublishedArticles,
  getMediaArticles,
  getMediaArticleById,
};
