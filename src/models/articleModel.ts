const { pool } = require('../config/dbConnect');
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const createArticleModel = async (title: string, description: string, images: string[], category_id: string, publishDate: Date) => {
  const query = 'INSERT INTO articles (title, description, images, publish_date, category_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const imagesToJson = JSON.stringify(images);

  const { rows } = await pool.query(query, [title, description, imagesToJson, publishDate, category_id, 'draft']);

  return rows[0];
};

const getALlArticlesModel = async () => {
  const query =
    'SELECT a.article_id, a.title, a.created_at, a.publish_date, a.status, a.description, a.images, c.title as cat_title FROM articles AS a JOIN blog_categories AS c On a.category_id = c.category_id';

  const { rows } = await pool.query(query);

  return rows;
};

const getALlPublishedArticlesModel = async () => {
  const query = `
  SELECT a.article_id, a.title, a.created_at, a.publish_date, a.status, a.description, a.images, c.title as cat_title FROM articles AS a JOIN blog_categories AS c On a.category_id = c.category_id WHERE a.status = 'published'
  `;

  const { rows } = await pool.query(query);

  return rows;
};

const getArticleIdModel = async (id: string) => {
  const query = `SELECT a.title, a.description, a.images, c.title as cat_title, c.category_id as category_id FROM articles AS a JOIN blog_categories AS c ON a.category_id = c.category_id WHERE a.article_id = '${id}'`;

  const { rows } = await pool.query(query);

  return rows[0];
};

const deleteArticleModel = async (id: string) => {
  const query = `DELETE FROM articles WHERE article_id = '${id}'`;

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting brand:', error);
    throw error;
  }
};

const publishScheduledArticles = async () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd', { locale: uk });

  const query = `UPDATE articles SET status = 'published' WHERE publish_date = '${currentDate}' AND status = 'draft'`;
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = { createArticleModel, getALlArticlesModel, getArticleIdModel, deleteArticleModel, publishScheduledArticles, getALlPublishedArticlesModel};
