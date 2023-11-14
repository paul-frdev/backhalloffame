const { pool } = require('../config/dbConnect');

const createWeightModel = async (weightName: string) => {
  try {
    const query = 'INSERT INTO weights (weight_name) VALUES ($1) RETURNING *';

    const { rows } = await pool.query(query, [weightName]);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting weight:', error);
    throw error;
  }
};

const updateWeightModel = async (id: string, weight_name: string) => {
  try {
    const query = `UPDATE weights SET weight_name = '${weight_name}' WHERE  weights_id @> ARRAY['${id}'::uuid]`;

    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting weight:', error);
    throw error;
  }
};

const deleteWeightModel = async (id: string) => {
  const query = `DELETE FROM weights WHERE weights_id @> ARRAY['${id}'::uuid]`;

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting weight:', error);
    throw error;
  }
};

const getWeightByIdModel = async (id: string) => {
  const query = `SELECT * FROM weights WHERE weights_id @> ARRAY['${id}'::uuid]`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting weight:', error);
    throw error;
  }
};

const getAllWeightsModel = async () => {
  const query = `SELECT * FROM weights;`;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error('Error deleting weights:', error);
    throw error;
  }
};

module.exports = { createWeightModel, updateWeightModel, deleteWeightModel, getWeightByIdModel, getAllWeightsModel };
