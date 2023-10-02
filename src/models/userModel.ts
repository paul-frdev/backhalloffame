const { pool } = require('../config/dbConnect');

const createUser = async (firstName: string, email: string, mobile: string, password: string) => {
  const query = 'INSERT INTO users (first_name, email, mobile, user_password) VALUES ($1, $2, $3, $4) RETURNING *';
  const { rows } = await pool.query(query, [firstName, email, mobile, password]);
  return rows[0];
};

module.exports = { createUser };
