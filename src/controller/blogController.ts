import { Request, Response } from 'express';

const { createBlogCategoryModel } = require('../models/blogModel');
const { pool } = require('../config/dbConnect');

const createNewBlogCategory = async (req: Request, res: Response) => {
  const { title } = req.body;

  // console.log('title', title);

  try {
    const sameTitleCategory = await pool.query('SELECT * FROM blog_categories WHERE title = $1', [title]);

    if (sameTitleCategory.rows.length > 0) {
      return res.status(400).json({ error: 'Category with the same title already exists' });
    }

    const newTitleCategory = await createBlogCategoryModel(title);

    return res.json(newTitleCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewBlogCategory };
