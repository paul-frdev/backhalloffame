const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  port: process.env.DATABASEPORT,
  password: process.env.DATABASEPASSWORD,
  host: 'localhost',
  user: 'postgres',
  database: 'halloffame',
});

module.exports = { pool };
