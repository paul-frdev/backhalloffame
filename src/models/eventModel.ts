import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const { pool } = require('../config/dbConnect');

const createEventModel = async (
  title: string,
  descriptionText: string,
  address: string,
  date: Date,
  time: string[],
  images: string[],
  ticketImg: string,
  adultPrice: number,
  childPrice: number,
  adultQuantityTickets: number,
  childrenQuantityTickets: number,
  publishDate: string
) => {
  const query = `
  INSERT INTO events (title, descriptionText, event_date, event_timeslots, images, location, adult_price, child_price, adult_quantity_tickets, children_quantity_tickets, publish_date, ticket_image, status)
 VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING *;
`;

  try {
    const imagesToJson = JSON.stringify(images);
    const { rows } = await pool.query(query, [
      title,
      descriptionText,
      date,
      time,
      imagesToJson,
      address,
      adultPrice,
      childPrice,
      adultQuantityTickets,
      childrenQuantityTickets,
      publishDate,
      ticketImg,
      'draft',
    ]);

    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const getAllEventsModel = async () => {
  const query = `
  SELECT e.event_id, e.title, e.descriptiontext, e.event_date, e.event_timeslots, e.images, e.location, e.adult_price, e.child_price, e.adult_quantity_tickets, e.children_quantity_tickets, e.publish_date, e.status, e.ticket_image, t.ticket_images FROM events AS e JOIN ticket_images AS t ON e.ticket_image::uuid = t.ticket_images_id;
  `;

  const { rows } = await pool.query(query);

  return rows;
};

const getALlPublishedEventsModel = async () => {
  const query = `
  SELECT e.event_id, e.title, e.descriptiontext, e.event_date, e.event_timeslots, e.images, e.location, e.adult_price, e.child_price, e.adult_quantity_tickets, e.children_quantity_tickets, e.publish_date, e.status, e.ticket_image, t.ticket_images FROM events AS e  WHERE a.status = 'published'
  `;

  const { rows } = await pool.query(query);

  return rows;
};

const publishScheduledEvents = async () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd', { locale: uk });

  const query = `UPDATE events SET status = 'published' WHERE publish_date = '${currentDate}' AND status = 'draft'`;
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = { createEventModel, getAllEventsModel, getALlPublishedEventsModel, publishScheduledEvents };
