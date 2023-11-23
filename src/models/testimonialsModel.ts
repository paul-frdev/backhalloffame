const { pool } = require('../config/dbConnect');

const createTestimonialModel = async (image: string[], description: string, author: string, dignity: string, is_active: string) => {
  const query =
    'INSERT INTO testimonials (testimonial_image, testimonial_description, testimonial_author, testimonial_dignity, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const imagesToJson = JSON.stringify(image);

  const { rows } = await pool.query(query, [imagesToJson, description, author, dignity, is_active]);

  return rows[0];
};

const getTestimonialsModel = async () => {
  const query = `SELECT * from testimonials;`;
  const { rows } = await pool.query(query);
  return rows;
};

const getTestimonialIdModel = async (id: string) => {
  const query = `SELECT * FROM testimonials WHERE testimonial_id = '${id}'`;
  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error getting slideId:', error);
    throw error;
  }
};

const updateTestimonialModel = async (id: string, image: string[], description: string, author: string, dignity: string) => {
  try {
    const query = `UPDATE testimonials SET testimonial_image = '${image}' testimonial_description = '${description}' testimonial_author = '${author}' testimonial_dignity = '${dignity}' WHERE testimonial_id = '${id}'`;

    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error('Error updating testimonial:', error);
    throw error;
  }
};

const updateIsActiveTestimonialModel = async (id: string) => {
  try {
    const getCurrentIsActiveQuery = `SELECT is_active FROM testimonials WHERE testimonial_id = '${id}'`;

    const { rows } = await pool.query(getCurrentIsActiveQuery);
    const currentIsActive = rows[0].is_active;

    const updatedIsActive = !currentIsActive;

    const updateQuery = `UPDATE testimonials SET is_active = ${updatedIsActive} WHERE testimonial_id = '${id}'`;

    const result = await pool.query(updateQuery);

    return result.rows[0];
  } catch (error) {
    console.error('Error updating testimonial is_active:', error);
    throw error;
  }
};

const deleteTestimonialByIdModel = async (id: string) => {
  const query = `DELETE FROM testimonials WHERE testimonial_id = '${id}'`;

  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    console.log(`Error deleting testimonial_id, ${error}`);
  }
};

module.exports = {
  createTestimonialModel,
  getTestimonialsModel,
  getTestimonialIdModel,
  updateTestimonialModel,
  updateIsActiveTestimonialModel,
  deleteTestimonialByIdModel,
};
