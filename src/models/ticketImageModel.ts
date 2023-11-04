const { pool } = require('../config/dbConnect');

const createTicketImageModel = async (title: string, images: string[]) => {
  const query = 'INSERT INTO ticket_images (title, ticket_images) VALUES ($1, $2) RETURNING *';
  const imagesToJson = JSON.stringify(images);
  const { rows } = await pool.query(query, [title, imagesToJson]);

  return rows[0];
};

const getALlTicketImagesModel = async () => {
  const query = 'SELECT * from ticket_images';

  const { rows } = await pool.query(query);

  return rows;
};

const getTicketImageIdModel = async (id: string) => {
  const query = `SELECT title, images, ticket_images WHERE ticket_images_id = '${id}'`;

  const { rows } = await pool.query(query);

  return rows[0];
};

const deleteTicketImageById = async (id: string) => {
  const query = `DELETE FROM ticket_images WHERE ticket_images_id = '${id}'`;

  const { rows } = await pool.query(query);

  return rows[0];
};

module.exports = { createTicketImageModel, getALlTicketImagesModel, getTicketImageIdModel, deleteTicketImageById };
