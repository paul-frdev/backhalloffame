const { createColorModel, updateColorsModel, deleteColorsModel, getColorByIdModel, getAllColorsModel } = require('../models/colorsModel');
import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');

const createColor = asyncHandler(async (req: Request, res: Response) => {
  const { color_name } = req.body;

  try {
    const response = await createColorModel(color_name);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const updateColor = asyncHandler(async (req: Request, res: Response) => {
  const { color_name } = req.body;
  const { id } = req.params;
  try {
    const response = await updateColorsModel(id, color_name);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteColor = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteColorsModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getColorById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
console.log('id', id);

  try {
    const response = await getColorByIdModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getallColors = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getAllColorsModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createColor, updateColor, deleteColor, getColorById, getallColors };
