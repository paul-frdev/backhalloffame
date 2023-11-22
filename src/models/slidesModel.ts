const { pool } = require('../config/dbConnect');

const createSlideModel = async (title: string, image: string[], slideType: string) => {
  try {
    const query = 'INSERT INTO slides (slide_image, title, type) VALUES ($1, $2, $3) RETURNING *';

    const imagesToJson = JSON.stringify(image);

    console.log('slideType', slideType);

    const { rows } = await pool.query(query, [imagesToJson, title, slideType]);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting slide:', error);
    throw error;
  }
};

const getSlidesModel = async () => {
  const query = 'SELECT * FROM slides;';
  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error('Error getting slides:', error);
    throw error;
  }
};

const getSlideIdModel = async (id: string) => {
  const query = `SELECT * FROM slides WHERE slide_id = '${id}'`;
  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error getting slideId:', error);
    throw error;
  }
};

const updateSlideModel = async (id: string, title: string, image: string[], type: string) => {
  try {
    const query = `UPDATE slides SET title = '${title}' slide_image = '${image}' type = '${type}' WHERE slide_id = '${id}'`;

    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error updating blog_category:', error);
    throw error;
  }
};

const updateIsActiveSlideModel = async (id: string) => {
  try {
    const getCurrentIsActiveQuery = `SELECT is_active FROM slides WHERE slide_id = '${id}'`;

    const { rows } = await pool.query(getCurrentIsActiveQuery);
    const currentIsActive = rows[0].is_active;

    const updatedIsActive = !currentIsActive;

    const updateQuery = `UPDATE slides SET is_active = ${updatedIsActive} WHERE slide_id = '${id}'`;

    const result = await pool.query(updateQuery);

    return result.rows[0];
  } catch (error) {
    console.error('Error updating slide is_active:', error);
    throw error;
  }
};

const deleteSlideByIdModel = async (id: string) => {
  const query = `DELETE FROM slides WHERE slide_id = '${id}'`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    console.log(`Error deleting SlideId, ${error}`);
  }
};

module.exports = { createSlideModel, getSlidesModel, getSlideIdModel, updateSlideModel, deleteSlideByIdModel, updateIsActiveSlideModel };
