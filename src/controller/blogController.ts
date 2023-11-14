import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');

const { createBlogCategoryModel, getAllCategoriesModel, deleteBlogCategoryModel, updateBlogCategoryModel } = require('../models/blogModel');
const { pool } = require('../config/dbConnect');

const createNewBlogCategory = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const sameTitleCategory = await pool.query('SELECT * FROM blog_categories WHERE title = $1', [title]);

    if (sameTitleCategory.rows.length > 0) {
      return res.status(400).json({ error: 'Category with the same title is already exists' });
    }

    const newTitleCategory = await createBlogCategoryModel(title);

    return res.json(newTitleCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getallCategories = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getAllCategoriesModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category_name } = req.body;
  const { id } = req.params;
  try {
    const response = await updateBlogCategoryModel(id, category_name);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlogCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

console.log('id', id);


  try {
    const response = await deleteBlogCategoryModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createNewBlogCategory, getallCategories, deleteBlogCategory, updateBlogCategory };
