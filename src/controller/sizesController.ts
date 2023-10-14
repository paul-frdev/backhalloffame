const { createSizeModel, updateSizeModel, deleteSizeModel, getSizeByIdModel, getAllSizesModel } = require('../models/colorsModel');
import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');

const createSize = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const response = await createSizeModel(title);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const updateSize = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;
  const { id } = req.params;
  try {
    const response = await updateSizeModel(id, title);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSize = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteSizeModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getSizeById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getSizeByIdModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getallSizes = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getAllSizesModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createSize, updateSize, deleteSize, getSizeById, getallSizes };
