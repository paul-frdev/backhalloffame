const { createProductModel, getProductsModel, deleteProductModel } = require('../models/productModel');
import { Request, Response } from 'express';

const asyncHandler = require('express-async-handler');

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, price, discountPrice, isDiscount, category, images, colors, sizes, weights, brands, quantity, tags } = req.body;

  try {
    const response = await createProductModel(
      title,
      description,
      price,
      quantity,
      discountPrice,
      isDiscount,
      images,
      category,
      colors,
      sizes,
      weights,
      brands,
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

    console.log('response', response);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteProductModel(id);
    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

module.exports = { createProduct, getProducts, deleteProductById };
