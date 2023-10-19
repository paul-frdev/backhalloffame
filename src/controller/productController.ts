const { createProductModel, getProductsModel } = require('../models/productModel');
import { Request, Response } from 'express';

const asyncHandler = require('express-async-handler');

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, price, discountPrice, isDiscount, category, images, colors, sizes, weights, brands, quantity, tags } = req.body;
  const sizesArray = sizes.map((size: string) => `'${size}'`).join(',');
  const colorsArray = colors.map((size: string) => `'${size}'`).join(',');

  try {
    const response = await createProductModel(
      title,
      description,
      price,
      discountPrice,
      isDiscount,
      category,
      images,
      colorsArray,
      sizesArray,
      weights,
      brands,
      quantity,
      tags
    );

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getProductsModel();

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

module.exports = { createProduct, getProducts };
