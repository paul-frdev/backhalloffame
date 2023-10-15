const { createProductModel } = require('../models/productModel')
import { Request, Response } from 'express';

const asyncHandler = require('express-async-handler');

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { product_id, title, description, price, discount, isDiscount, category, images, colors, sizes, weights } = req.body;

  try {
    const response = await createProductModel(product_id, title, description, price, discount, isDiscount, category, images, colors, sizes, weights);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});


module.exports = { createProduct } 