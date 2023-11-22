const { pool } = require('../config/dbConnect');

const createTestimonialModel = async (images: string[], description: string, author: string, dignity: string) => {
  const query =
    'INSERT INTO testimonials (testimonial_image, testimonial_description, testimonial_author, testimonial_dignity) VALUES ($1, $2, $3, $4) RETURNING *';
  const imagesToJson = JSON.stringify(images);
  const { rows } = await pool.query(query, [imagesToJson, description, author, dignity]);

  return rows[0];
};

module.exports = { createTestimonialModel };
