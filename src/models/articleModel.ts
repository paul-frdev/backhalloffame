const { pool } = require('../config/dbConnect');

const createArticleModel = async (title: string, description: string, images: string[], category_id: string) => {
  const query = 'INSERT INTO articles (title, description, images, category_id) VALUES ($1, $2, $3, $4) RETURNING *';
  const imagesToJson = JSON.stringify(images);
  const { rows } = await pool.query(query, [title, description, imagesToJson, category_id]);

  return rows[0];
};

module.exports = { createArticleModel };
