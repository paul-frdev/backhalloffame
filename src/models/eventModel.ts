import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const { pool } = require('../config/dbConnect');

const createEventModel = async (
  title: string,
  descriptionText: string,
  date: Date,
  publishDate: Date,
  time: string[],
  images: string[],
  address: string,
  adultPrice: number,
  childPrice: number,
  adultQuantityTickets: number,
  childrenQuantityTickets: number,
  ticketImg: string
) => {
  const query = `
  INSERT INTO events (title, descriptiontext, event_date, publish_date, images, location_address, adult_price, child_price, adult_quantity_tickets, children_quantity_tickets, ticket_image_id, status)
 VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  RETURNING event_id;
`;

  try {
    const imagesToJson = JSON.stringify(images);
    const { rows } = await pool.query(query, [
      title,
      descriptionText,
      date,
      publishDate,
      imagesToJson,
      address,
      adultPrice,
      childPrice,
      adultQuantityTickets,
      childrenQuantityTickets,
      ticketImg,
      'draft',
    ]);

    const eventId = rows[0].event_id;

    for (const timeId of time) {
      await pool.query(`INSERT INTO event_time_options (event_id, time_id) VALUES ($1, $2)`, [eventId, timeId]);
    }

    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const getAllEventsModel = async () => {
  const query = `
    SELECT 
      e.event_id, e.title, e.descriptiontext, e.event_date, e.publish_date, e.images, e.location_address, e.adult_price, e.child_price, e.adult_quantity_tickets, e.children_quantity_tickets, e.status, 
      (
        SELECT array_agg(t.time_label)
        FROM time_options t
        JOIN event_time_options eto ON eto.time_id = t.time_id
        WHERE eto.event_id = e.event_id
      ) as options,
      (
        SELECT array_agg(DISTINCT ti.ticket_images)
        FROM ticket_images ti
        JOIN events e ON e.ticket_image_id = ti.ticket_images_id
      ) as ticket_img
    FROM events e;
  `;

  const { rows } = await pool.query(query);

  return rows;
};

const getALlPublishedEventsModel = async () => {
  const query = `
  SELECT 
  e.event_id, 
  e.title, 
  e.descriptiontext, 
  e.event_date, 
  e.images, 
  e.location_address, 
  e.adult_price, 
  e.child_price, 
  e.adult_quantity_tickets, 
  e.children_quantity_tickets, 
  e.publish_date, 
  e.status, 
  e.ticket_image_id, 
  t.ticket_images, 
  (SELECT array_agg(t.time_label) 
   FROM time_options t  
   JOIN event_time_options eto ON eto.time_id = t.time_id 
   WHERE eto.event_id = e.event_id
  ) as options 
FROM events AS e 
JOIN ticket_images AS t ON e.ticket_image_id::uuid = t.ticket_images_id 
WHERE e.status = 'published';
  `;

  const { rows } = await pool.query(query);

  return rows;
};

const getPublishedEventIdModel = async (id: string) => {
  const query = `
  SELECT 
  e.event_id, 
  e.title, 
  e.descriptiontext, 
  e.event_date, 
  e.images, 
  e.location_address, 
  e.adult_price, 
  e.child_price, 
  e.adult_quantity_tickets, 
  e.children_quantity_tickets, 
  e.publish_date, 
  e.status, 
  e.ticket_image_id, 
  t.ticket_images, 
  (SELECT array_agg(t.time_label) 
   FROM time_options t  
   JOIN event_time_options eto ON eto.time_id = t.time_id 
   WHERE eto.event_id = e.event_id
  ) as options 
FROM events AS e 
JOIN ticket_images AS t ON e.ticket_image_id::uuid = t.ticket_images_id 
WHERE e.status = 'published' AND event_id = '${id}';
  `;

  const { rows } = await pool.query(query);

  return rows[0];
};

const publishScheduledEvents = async () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd', { locale: uk });

  const query = `UPDATE events SET status = 'published' WHERE publish_date = '${currentDate}' OR publish_date < '${currentDate}' AND status = 'draft'`;
  const { rows } = await pool.query(query);
  return rows;
};

const deleteEventModel = async (id: string) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await Promise.all([client.query(`DELETE FROM event_time_options WHERE event_id = '${id}'`)]);

    await client.query(`DELETE FROM events WHERE event_id = '${id}'`);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting event:', error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createEventModel,
  getAllEventsModel,
  getALlPublishedEventsModel,
  publishScheduledEvents,
  getPublishedEventIdModel,
  deleteEventModel,
};
