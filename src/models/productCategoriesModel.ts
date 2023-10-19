const { pool } = require('../config/dbConnect');

const createPrCategoryModel = async (categoryName: string) => {
  try {
    const query = 'INSERT INTO product_categories (category_name) VALUES ($1) RETURNING *';
    
    const { rows } = await pool.query(query, [categoryName]);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error adding to product_categories:', error);
    throw error;
  }
};

const updatePrCategoryModel = async (id: string, category_name: string) => {
  try {
    const query = `UPDATE product_categories SET category_name = '${category_name}' WHERE category_id = '${id}'`;

    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error updating product_category:', error);
    throw error;
  }
};

const deletePrCategoryModel = async (id: string) => {
  const query = `DELETE FROM product_categories WHERE category_id = '${id}'`;

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error deleting product_category:', error);
    throw error;
  }
};

const getPrCategoryByIdModel = async (id: string) => {
  const query = `SELECT * FROM product_categories WHERE category_id = '${id}'`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error getting product_category:', error);
    throw error;
  }
};

const getAllPrCategoriesModel = async () => {
  const query = `SELECT * FROM product_categories;`;

  try {
    const { rows } = await pool.query(query);
    
    return rows;
  } catch (error) {
    // Handle the error here
    console.error('Error getting from product_categories:', error);
    throw error;
  }
};

module.exports = { createPrCategoryModel, updatePrCategoryModel, deletePrCategoryModel, getPrCategoryByIdModel, getAllPrCategoriesModel };
