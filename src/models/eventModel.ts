const { pool } = require('../config/dbConnect');

const createEventModel = async (
  title: string,
  descriptionText: string,
  event_date: Date,
  event_timeslots: string[],
  images: string[],
  location: string,
  adult_price: number,
  child_price: number,
  adult_quantity_tickets: number,
  children_quantity_tickets: number
) => {
  const query = `
  INSERT INTO events (title, descriptionText, event_date, event_timeslots, images, location, adult_price, child_price, adult_quantity_tickets, children_quantity_tickets)
 VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *;
`;

  try {
    const imagesToJson = JSON.stringify(images);
    const { rows } = await pool.query(query, [
      title,
      descriptionText,
      event_date,
      event_timeslots,
      imagesToJson,
      location,
      adult_price,
      child_price,
      adult_quantity_tickets,
      children_quantity_tickets,
    ]);

    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createEventModel };
