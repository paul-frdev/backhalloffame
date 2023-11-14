const { pool } = require('../config/dbConnect');

const createSizeModel = async (sizeName: string) => {
  try {
    const query = 'INSERT INTO sizes (size_name) VALUES ($1) RETURNING *';

    const { rows } = await pool.query(query, [sizeName]);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting size:', error);
    throw error;
  }
};

const updateSizeModel = async (id: string, title: string) => {
  try {
    const query = `UPDATE sizes SET size_name = '${title}' WHERE sizes_id @> ARRAY['${id}'::uuid]`;

    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting size:', error);
    throw error;
  }
};

const deleteSizeModel = async (id: string) => {
  const query = `DELETE FROM sizes WHERE sizes_id @> ARRAY['${id}'::uuid]`;

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting size:', error);
    throw error;
  }
};

const getSizeByIdModel = async (id: string) => {
  const query = `SELECT * FROM sizes WHERE sizes_id @> ARRAY['${id}'::uuid]`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting size:', error);
    throw error;
  }
};

const getAllSizesModel = async () => {
  const query = `SELECT * FROM sizes;`;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error('Error deleting sizes:', error);
    throw error;
  }
};

module.exports = { createSizeModel, updateSizeModel, deleteSizeModel, getSizeByIdModel, getAllSizesModel };
