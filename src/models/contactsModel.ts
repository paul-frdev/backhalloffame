const { pool } = require("../config/dbConnect");

const createContactsModel = async (
  title: string,
  address: string,
  email: string,
  phone: string,
) => {
  const query =
    "INSERT INTO contacts (contacts_title, contacts_address, contacts_email, contacts_phone) VALUES ($1, $2, $3, $4) RETURNING *";

  const { rows } = await pool.query(query, [title, address, email, phone]);

  return rows[0];
};

const getContactsModel = async () => {
  const query = `SELECT * FROM contacts;`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error("Error is getting contacts from table:", error);
    throw error;
  }
};

const getContactsModelId = async (id: string) => {
  const query = `SELECT * FROM contacts WHERE contacts_title = '${id}';`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error("Error is getting contacts_id from table:", error);
    throw error;
  }
};

const updateContactsModel = async (
  id: string,
  title: string,
  address: string,
  email: string,
  phone: string,
) => {
  const query =
    "UPDATE contacts SET contacts_title = $1, contacts_address = $2, contacts_email = $3, contacts_phone = $4 WHERE contacts_id = $5;";

  const values = [title, address, email, phone, id];

  try {
    const { rows } = await pool.query(query, values);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error("Error is getting contacts from table:", error);
    throw error;
  }
};

module.exports = {
  getContactsModel,
  createContactsModel,
  getContactsModelId,
  updateContactsModel,
};
