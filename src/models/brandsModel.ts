const { pool } = require('../config/dbConnect');

const createBrandModel = async (brandName: string) => {
  try {
    const query = 'INSERT INTO brands (brand_name) VALUES ($1) RETURNING *';

    const { rows } = await pool.query(query, [brandName]);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting brand:', error);
    throw error;
  }
};

const updateBrandModel = async (id: string, brand_name: string) => {
  try {
    const query = `UPDATE brands SET brand_name = '${brand_name}' WHERE brand_id @> ARRAY['${id}'::uuid]`;

    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting brand:', error);
    throw error;
  }
};

const deleteBrandModel = async (id: string) => {
  const query = `DELETE FROM brands WHERE brand_id @> ARRAY['${id}'::uuid]`;

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting brand:', error);
    throw error;
  }
};

const getBrandByIdModel = async (id: string) => {
  const query = `SELECT * FROM brands WHERE brand_id @> ARRAY['${id}'::uuid]`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting brand:', error);
    throw error;
  }
};

const getAllBrandsModel = async () => {
  const query = `SELECT * FROM brands;`;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error('Error deleting brands:', error);
    throw error;
  }
};

module.exports = { createBrandModel, updateBrandModel, deleteBrandModel, getBrandByIdModel, getAllBrandsModel };
