const { createBrandModel, updateBrandModel, deleteBrandModel, getBrandByIdModel, getAllBrandsModel } = require('../models/brandsModel');
import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const { brand_name } = req.body;

  try {
    const response = await createBrandModel(brand_name);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const { brand_name } = req.body;
  const { id } = req.params;
  try {
    const response = await updateBrandModel(id, brand_name);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteBrandModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrandById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getBrandByIdModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getallBrands = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getAllBrandsModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createBrand, updateBrand, deleteBrand, getBrandById, getallBrands };
