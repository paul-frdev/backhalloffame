const { pool } = require("../config/dbConnect");

const getTimeOptionsModel = async () => {
  const query = "SELECT * from time_options";

  const { rows } = await pool.query(query);

  return rows;
};

module.exports = { getTimeOptionsModel };
