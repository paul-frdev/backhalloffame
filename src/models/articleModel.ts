const { pool } = require('../config/dbConnect');

const createArticleModel = async (title: string, description: string, images: string[], category_id: string) => {
  const query = 'INSERT INTO articles (title, description, images, category_id) VALUES ($1, $2, $3, $4) RETURNING *';
  const imagesToJson = JSON.stringify(images);
  const { rows } = await pool.query(query, [title, description, imagesToJson, category_id]);

  return rows[0];
};

const getALlArticlesModel = async () => {
  const query =
    'SELECT a.article_id, a.title, a.created_at, a.description, a.images, c.title as cat_title FROM articles AS a JOIN blog_categories AS c On a.category_id = c.category_id';

  const { rows } = await pool.query(query);
  console.log('rows', rows);

  return rows;
};

const getArticleIdModel = async (id: string) => {
  const query = `SELECT a.title, a.description, a.images, c.title as cat_title, c.category_id as category_id FROM articles AS a JOIN blog_categories AS c ON a.category_id = c.category_id WHERE a.article_id = '${id}'`;

  const { rows } = await pool.query(query);

  return rows[0];
};

module.exports = { createArticleModel, getALlArticlesModel, getArticleIdModel };
