const { createWeightModel, updateWeightModel, deleteWeightModel, getWeightByIdModel, getAllWeightsModel } = require('../models/weightsModel');
import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');

const createWeight = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const response = await createWeightModel(title);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const updateWeight = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;
  const { id } = req.params;
  try {
    const response = await updateWeightModel(id, title);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteWeight = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteWeightModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getWeightById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getWeightByIdModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getallWeights = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getAllWeightsModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createWeight, updateWeight, deleteWeight, getWeightById, getallWeights };
