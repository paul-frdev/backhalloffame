const { pool } = require('../config/dbConnect');

const createBlogCategoryModel = async (title: string) => {
  const query = 'INSERT INTO blog_categories (title) VALUES ($1) RETURNING *';

  const { rows } = await pool.query(query, [title]);

  return rows[0];
};

const getAllCategoriesModel = async () => {
  const query = 'Select * From blog_categories';
  const { rows } = await pool.query(query);

  return rows;
};

module.exports = { createBlogCategoryModel, getAllCategoriesModel };
