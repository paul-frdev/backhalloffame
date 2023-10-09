const { pool } = require('../config/dbConnect');

const createBlogCategoryModel = async (title: string) => {
  const query = 'INSERT INTO blog_categories (title) VALUES ($1) RETURNING *';
  console.log('title', title);

  const { rows } = await pool.query(query, [title]);

  return rows[0];
};

module.exports = { createBlogCategoryModel };
