import { Request, Response } from "express";

const { pool } = require("../config/dbConnect");

const createProductModel = async (
  title: string,
  description: string,
  price: string,
  quantity: number,
  discount: number,
  isdiscount: boolean,
  images: string[],
  category: string,
  colors: string[],
  sizes: string[],
  weights: string[],
  brands: string[],
  tags: string[],
) => {
  const query = `
  INSERT INTO products (title, description_text, price, quantity, discount, isdiscount, images, category_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING product_id;
`;

  const imagesToJson = JSON.stringify(images);
  const { rows } = await pool.query(query, [
    title,
    description,
    price,
    quantity,
    discount,
    isdiscount,
    imagesToJson,
    category,
  ]);

  const productId = rows[0].product_id;

  for (const colorId of colors) {
    await pool.query(
      `INSERT INTO product_colors (product_id, color_id) VALUES ($1, $2)`,
      [productId, colorId],
    );
  }

  for (const weightId of weights) {
    await pool.query(
      `INSERT INTO product_weights (product_id, weight_id) VALUES ($1, $2)`,
      [productId, weightId],
    );
  }

  for (const sizeId of sizes) {
    await pool.query(
      `INSERT INTO product_sizes (product_id, size_id) VALUES ($1, $2)`,
      [productId, sizeId],
    );
  }

  for (const brandId of brands) {
    await pool.query(
      `INSERT INTO product_brands (product_id, brand_id) VALUES ($1, $2)`,
      [productId, brandId],
    );
  }

  for (const tagId of tags) {
    await pool.query(
      `INSERT INTO product_tags (product_id, tag_id) VALUES ($1, $2)`,
      [productId, tagId],
    );
  }

  return rows[0];
};

const getProductsModel = async () => {
  const query = `
  SELECT 
    p.product_id,
    p.title as product_title,
    p.description_text,
    p.price,
    p.quantity,
    p.discount,
    p.isDiscount,
    p.images,
    pc.category_name as categoryTitle,
    (
        SELECT array_agg(c.color_name)
        FROM colors c
        JOIN product_colors pc ON pc.color_id = c.color_id
        WHERE pc.product_id = p.product_id
    ) as colors,
    (
        SELECT array_agg(s.size_name)
        FROM sizes s
        JOIN product_sizes ps ON ps.size_id = s.size_id
        WHERE ps.product_id = p.product_id
    ) as sizes,
    (
        SELECT array_agg(w.weight_name)
        FROM weights w
        JOIN product_weights pw ON pw.weight_id = w.weight_id
        WHERE pw.product_id = p.product_id
    ) as weights,
    (
        SELECT array_agg(b.brand_name)
        FROM brands b
        JOIN product_brands pb ON pb.brand_id = b.brand_id
        WHERE pb.product_id = p.product_id
    ) as brands,
    (
        SELECT array_agg(t.tag_name)
        FROM tags t
        JOIN product_tags pt ON pt.tag_id = t.tag_id
        WHERE pt.product_id = p.product_id
    ) as tags
FROM products p
JOIN product_categories pc ON pc.category_id = p.category_id;
`;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error("Error getting from products:", error);
    throw error;
  }
};

const deleteProductModel = async (id: string) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await Promise.all([
      client.query(`DELETE FROM product_colors WHERE product_id = '${id}'`),
      client.query(`DELETE FROM product_sizes WHERE product_id = '${id}'`),
      client.query(`DELETE FROM product_weights WHERE product_id = '${id}'`),
      client.query(`DELETE FROM product_brands WHERE product_id = '${id}'`),
      client.query(`DELETE FROM product_tags WHERE product_id = '${id}'`),
    ]);

    await client.query(`DELETE FROM products WHERE product_id = '${id}'`);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting product:", error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { createProductModel, getProductsModel, deleteProductModel };
