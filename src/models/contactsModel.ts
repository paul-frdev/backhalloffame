const { pool } = require('../config/dbConnect');

const createContactsModel = async (title: string, address: string, email: string) => {
  const query = 'INSERT INTO contacts (contacts_title, contacts_address, contacts_email) VALUES ($1, $2, $3) RETURNING *';

  const { rows } = await pool.query(query, [title, address, email]);

  return rows[0];
};

const getContactsModel = async () => {
  const query = `SELECT * FROM contacts;`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error is getting contacts from table:', error);
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
    console.error('Error is getting contacts_id from table:', error);
    throw error;
  }
};

const updateContactsModel = async (id: string, title: string, address: string, email: string) => {
  const query = 'UPDATE contacts SET contacts_title = $1, contacts_address = $2, contacts_email = $3, WHERE contacts_id = $4;';
  console.log('title, description, id', title, address, email, id);

  const values = [title, address, email, id];

  try {
    const { rows } = await pool.query(query, values);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error is getting contacts from table:', error);
    throw error;
  }
};

module.exports = { getContactsModel, createContactsModel, getContactsModelId, updateContactsModel };
