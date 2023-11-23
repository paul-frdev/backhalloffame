const { pool } = require('../config/dbConnect');

const createAboutModel = async (title: string, description: string) => {
  const query = 'INSERT INTO about (about_title, about_description) VALUES ($1, $2) RETURNING *';

  const { rows } = await pool.query(query, [title, description]);

  return rows[0];
};

const getAboutUSModel = async () => {
  const query = `SELECT * FROM about;`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error is getting about from table:', error);
    throw error;
  }
};

const getAboutModel = async (id: string) => {
  const query = `SELECT * FROM about WHERE about_id = '${id}';`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error is getting about from table:', error);
    throw error;
  }
};

const updateAboutModel = async (id: string, title: string, description: string) => {
  try {
    const query = `UPDATE about SET about_title = '${title}' about_description = '${description}' WHERE about_id = '${id}' `;

    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting brand:', error);
    throw error;
  }
};

module.exports = { getAboutModel, createAboutModel, updateAboutModel, getAboutUSModel };
