const { pool } = require("../config/dbConnect");

const createUser = async (
  firstName: string,
  email: string,
  mobilePhone: string,
  password: string,
) => {
  const query =
    "INSERT INTO users (first_name, email, mobile, user_password) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(query, [
    firstName,
    email,
    mobilePhone,
    password,
  ]);

  return rows[0];
};

const currentUser = async (email: string) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const { rows } = await pool.query(query, [email]);

  return rows[0];
};

const getUserById = async (id: string) => {
  const query = `SELECT * FROM users WHERE user_id = '${id}'`;

  const { rows } = await pool.query(query);

  return rows[0];
};

const authorize = async (userId: string) => {
  const query = "SELECT first_name, email FROM users WHERE user_id = $1";
  const { rows } = await pool.query(query, [userId]);

  return rows[0];
};
module.exports = { createUser, currentUser, authorize, getUserById };
