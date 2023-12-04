const { pool } = require("../config/dbConnect");

const createTestimonialModel = async (
  image: string[],
  description: string,
  author: string,
  dignity: string,
  is_active: string,
  adminTag: string,
) => {
  const query =
    "INSERT INTO testimonials (testimonial_image, testimonial_description, testimonial_author, testimonial_dignity, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const imagesToJson = JSON.stringify(image);

  const { rows } = await pool.query(query, [
    imagesToJson,
    description,
    author,
    dignity,
    is_active,
  ]);

  const testimonialId = rows[0].testimonial_id;

  await pool.query(
    `INSERT INTO testimonial_tags (testimonial_id, tag_id) VALUES ($1, $2)`,
    [testimonialId, adminTag],
  );

  return rows[0];
};

const getTestimonialsModel = async () => {
  const query = `SELECT * from testimonials;`;
  const { rows } = await pool.query(query);
  return rows;
};

const getActiveTestimonialsModel = async () => {
  const query = `SELECT * from testimonials WHERE is_active = true;`;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(`Error is getting active ${error}`);
  }
};

const getTestimonialIdModel = async (id: string) => {
  const query = `SELECT * FROM testimonials WHERE testimonial_id = '${id}'`;
  try {
    const { rows } = await pool.query(query);

    return rows[0];
  } catch (error) {
    // Handle the error here
    console.error("Error getting slideId:", error);
    throw error;
  }
};

const updateTestimonialModel = async (
  id: string,
  image: string[],
  description: string,
  author: string,
  dignity: string,
) => {
  const imageToJson = JSON.stringify(image);
  try {
    const query = `UPDATE testimonials SET testimonial_image = $1, testimonial_description = $2, testimonial_author = $3, testimonial_dignity = $4 WHERE testimonial_id = $5`;

    const values = [imageToJson, description, author, dignity, id];

    const { rows } = await pool.query(query, values);

    return rows[0];
  } catch (error) {
    console.error("Error updating review:", error);
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
    console.error("Error updating testimonial is_active:", error);
    throw error;
  }
};

const deleteTestimonialByIdModel = async (id: string) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await Promise.resolve([
      client.query(
        `DELETE FROM testimonial_tags WHERE testimonial_id = '${id}'`,
      ),
    ]);

    await client.query(
      `DELETE FROM testimonials WHERE testimonial_id = '${id}'`,
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting product:", error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createTestimonialModel,
  getTestimonialsModel,
  getTestimonialIdModel,
  updateTestimonialModel,
  updateIsActiveTestimonialModel,
  deleteTestimonialByIdModel,
  getActiveTestimonialsModel,
};
