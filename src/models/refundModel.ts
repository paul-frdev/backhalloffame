const { pool } = require('../config/dbConnect');

const createRefundModel = async (text: string) => {
  const query = 'INSERT INTO refund (refund_text) VALUES ($1) RETURNING *';

  const { rows } = await pool.query(query, [text]);

  return rows[0];
};

const getRefundModel = async () => {
  const query = `SELECT * FROM refund;`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error is getting refund from table:', error);
    throw error;
  }
};

const getRefundModelId = async (id: string) => {
  const query = `SELECT * FROM refund WHERE refund_id = '${id}';`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error is getting refund from table:', error);
    throw error;
  }
};

const updateRefundModel = async (id: string, text: string) => {
  const query = 'UPDATE refund SET refund_text = $1 WHERE refund_id = $2;';

  const values = [text, id];

  try {
    const { rows } = await pool.query(query, values);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error is getting refund from table:', error);
    throw error;
  }
};

module.exports = { createRefundModel, getRefundModel, getRefundModelId, updateRefundModel };
