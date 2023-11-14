const { pool } = require('../config/dbConnect');

const createColorModel = async (colorName: string) => {
  const query = 'INSERT INTO colors (color_name) VALUES ($1) RETURNING *';

  const { rows } = await pool.query(query, [colorName]);

  return rows[0];
};

const updateColorsModel = async (id: string, color_name: string) => {
  const query = `UPDATE colors SET color_name = '${color_name}' WHERE colors_id @> ARRAY['${id}'::uuid]`;

  const { rows } = await pool.query(query);

  return rows[0];
};

const deleteColorsModel = async (id: string) => {
  const query = `DELETE FROM colors WHERE colors_id @> ARRAY['${id}'::uuid]`;

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting color:', error);
    throw error;
  }
};

const getColorByIdModel = async (id: string) => {
  const query = `SELECT * FROM colors WHERE colors_id @> ARRAY['${id}'::uuid]`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting color:', error);
    throw error;
  }
};

const getAllColorsModel = async () => {
  const query = `SELECT * FROM colors;`;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error('Error deleting color:', error);
    throw error;
  }
};

module.exports = { createColorModel, updateColorsModel, deleteColorsModel, getColorByIdModel, getAllColorsModel };
