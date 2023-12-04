const { pool } = require("../config/dbConnect");

const createBlogCategoryModel = async (title: string) => {
  const query = "INSERT INTO blog_categories (title) VALUES ($1) RETURNING *";

  const { rows } = await pool.query(query, [title]);

  return rows[0];
};

const getAllCategoriesModel = async () => {
  const query = "Select * From blog_categories";
  const { rows } = await pool.query(query);

  return rows;
};

const deleteBlogCategoryModel = async (id: string) => {
  const query = `DELETE FROM blog_categories WHERE category_id = '${id}'`;

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error("Error deleting blog_category:", error);
    throw error;
  }
};

const updateBlogCategoryModel = async (id: string, category_name: string) => {
  try {
    const query = `UPDATE blog_categories SET category_name = '${category_name}' WHERE category_id = '${id}'`;

    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error("Error updating blog_category:", error);
    throw error;
  }
};

module.exports = {
  createBlogCategoryModel,
  getAllCategoriesModel,
  deleteBlogCategoryModel,
  updateBlogCategoryModel,
};
