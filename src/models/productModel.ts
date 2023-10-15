const { pool } = require('../config/dbConnect');

const createProductModel = async (
  product_id: string,
  title: string,
  description: string,
  price: string,
  discount: number,
  isDiscount: boolean,
  category: string,
  images: string[],
  colors: string[],
  sizes: string[],
  weights: string[]
) => {
  const query = `
  INSERT INTO products (product_id, title, description, price, discount, isDiscount, category, images, colors, sizes, weights)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  RETURNING *;
`;

  const { rows } = pool.query(query, [product_id, title, description, price, discount, isDiscount, category, images, colors, sizes, weights]);

  return rows[0];
};

module.exports = { createProductModel };
