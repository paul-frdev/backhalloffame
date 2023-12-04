const { pool } = require("../config/dbConnect");

const getAllTagsModel = async () => {
  const query = `SELECT * FROM tags;`;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error("Error is getting tags from table:", error);
    throw error;
  }
};

const getProductTagsModel = async () => {
  const query = `SELECT * FROM tags WHERE tag_name = 'Populated' OR tag_name = 'Featured' OR tag_name = 'Special';`;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error("Error is getting tags from table:", error);
    throw error;
  }
};

const getTestimonialAdminTagModel = async () => {
  const query = `SELECT tag_id FROM tags WHERE tag_name = 'admin';`;

  try {
    const { rows } = await pool.query(query);

    return rows[0].tag_id;
  } catch (error) {
    // Handle the error here
    console.error("Error is getting tags from table:", error);
    throw error;
  }
};

const getTestimonialUserTagModel = async () => {
  const query = `SELECT tag_id FROM tags WHERE tag_name = 'user';`;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error("Error is getting tags from table:", error);
    throw error;
  }
};

module.exports = {
  getAllTagsModel,
  getProductTagsModel,
  getTestimonialAdminTagModel,
  getTestimonialUserTagModel,
};
