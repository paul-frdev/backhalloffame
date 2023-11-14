const { pool } = require('../config/dbConnect');

const getAllTagsModel = async () => {
  const query = `SELECT * FROM tags;`;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error('Error is getting tags from table:', error);
    throw error;
  }
};

module.exports = { getAllTagsModel };
