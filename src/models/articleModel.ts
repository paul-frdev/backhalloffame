const { pool } = require("../config/dbConnect");
import { format } from "date-fns";
import { uk } from "date-fns/locale";

const createArticleModel = async (
  title: string,
  description: string,
  images: string[],
  category_id: string,
  publishDate: Date,
  type: string,
) => {
  const query =
    "INSERT INTO articles (title, description, images, publish_date, category_id, status, article_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const imagesToJson = JSON.stringify(images);

  const { rows } = await pool.query(query, [
    title,
    description,
    imagesToJson,
    publishDate,
    category_id,
    "draft",
    type,
  ]);

  return rows[0];
};

const getBlogArticlesModel = async () => {
  const query = `
    SELECT a.article_id, a.title, a.created_at, a.publish_date, a.status, a.description, a.images, a.article_type, c.title as cat_title FROM articles AS a JOIN blog_categories AS c On a.category_id = c.category_id WHERE article_type = 'blog_news'
    `;

  const { rows } = await pool.query(query);

  return rows;
};

const getMediaArticlesModel = async () => {
  const query = `
    SELECT a.article_id, a.title, a.created_at, a.publish_date, a.status, a.description, a.images, a.article_type, c.title as cat_title FROM articles AS a JOIN blog_categories AS c On a.category_id = c.category_id WHERE article_type = 'media_news'
    `;

  const { rows } = await pool.query(query);

  return rows;
};

const getMediaArticleIdModel = async (id: string) => {
  const query = `
  SELECT 
    a.title, 
    a.description, 
    a.images, 
    a.article_type,
    c.title AS cat_title, 
    a.publish_date,
    c.category_id AS category_id 
  FROM 
    articles AS a 
  JOIN 
    blog_categories AS c 
  ON 
    a.category_id = c.category_id 
  WHERE 
    a.article_id = '${id}' AND article_type = 'media_news'
`;

  const { rows } = await pool.query(query);

  return rows[0];
};

const getALlPublishedArticlesModel = async () => {
  const query = `
  SELECT a.article_id, a.title, a.created_at, a.publish_date, a.status, a.description, a.images, c.title as cat_title FROM articles AS a JOIN blog_categories AS c On a.category_id = c.category_id WHERE a.status = 'published'
  `;

  const { rows } = await pool.query(query);

  return rows;
};

const getArticleIdModel = async (id: string) => {
  const query = `
  SELECT 
    a.title, 
    a.description, 
    a.images, 
    a.article_type,
    c.title AS cat_title, 
    a.publish_date,
    c.category_id AS category_id 
  FROM 
    articles AS a 
  JOIN 
    blog_categories AS c 
  ON 
    a.category_id = c.category_id 
  WHERE 
    a.article_id = '${id}'
`;

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
    console.error("Error deleting brand:", error);
    throw error;
  }
};

const publishScheduledArticles = async () => {
  const currentDate = format(new Date(), "yyyy-MM-dd", { locale: uk });

  const query = `UPDATE articles SET status = 'published' WHERE publish_date = '${currentDate}' AND status = 'draft'`;
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = {
  createArticleModel,
  getBlogArticlesModel,
  getMediaArticlesModel,
  getArticleIdModel,
  deleteArticleModel,
  publishScheduledArticles,
  getALlPublishedArticlesModel,
  getMediaArticleIdModel,
};
