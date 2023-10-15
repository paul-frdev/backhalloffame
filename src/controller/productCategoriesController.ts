const { createPrCategoryModel, updatePrCategoryModel, deletePrCategoryModel, getPrCategoryByIdModel, getAllPrCategoriesModel } = require('../models/productCategoriesModel');
import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');

const createPrCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category_name } = req.body;

  try {
    const response = await createPrCategoryModel(category_name);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const updatePrCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category_name } = req.body;
  const { id } = req.params;
  try {
    const response = await updatePrCategoryModel(id, category_name);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deletePrCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deletePrCategoryModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getPrCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getPrCategoryByIdModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getallPrCategories = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getAllPrCategoriesModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createPrCategory, updatePrCategory, deletePrCategory, getPrCategoryById, getallPrCategories };
