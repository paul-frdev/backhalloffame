const { pool } = require('../config/dbConnect');

const createProductModel = async (
  title: string,
  description: string,
  price: string,
  discount: number,
  isdiscount: boolean,
  category: string,
  images: string[],
  colors: string[],
  sizes: string[],
  weights: string[],
  brands: string[],
  quantity: number,
  tags: string
) => {
  const query = `
  INSERT INTO products (title, description, price, discount, isdiscount, category, images, colors, sizes, weights, brands, tags, quantity)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING *;
`;

  const imagesToJson = JSON.stringify(images);
  const { rows } = await pool.query(query, [
    title,
    description,
    price,
    discount,
    isdiscount,
    category,
    imagesToJson,
    colors,
    sizes,
    weights,
    brands,
    tags,
    quantity,
  ]);

  return rows[0];
};

const getProductsModel = async () => {
  const query = `
  SELECT 
  p.product_id,
  p.title as product_title,
  p.price,
  p.discount,
  p.isdiscount,
  pct.category_name as categoryTitle,
  p.images,
  p.tags,
  (
    SELECT array_agg(s.size_name)
    FROM sizes s
    WHERE s.sizes_id = ANY(ARRAY[p.sizes]::uuid[])
  ) as sizes,
  (
    SELECT array_agg(c.color_name)
    FROM colors c
    WHERE c.colors_id = ANY(ARRAY[p.colors]::uuid[])
  ) as colors,
  (
    SELECT array_agg(w.weight_name)
    FROM weights w
    WHERE w.weights_id = ANY(ARRAY[p.weights]::uuid[])
  ) as weights,
  (
    SELECT array_agg(b.brand_name)
    FROM brands b
    WHERE b.brand_id = ANY(ARRAY[p.brands]::uuid[])
  ) as brands
FROM products p
JOIN product_categories as pct ON pct.category_id = p.category::uuid;
  `;

  try {
    const { rows } = await pool.query(query);

    return rows;
  } catch (error) {
    // Handle the error here
    console.error('Error getting from products:', error);
    throw error;
  }
};

module.exports = { createProductModel, getProductsModel };
