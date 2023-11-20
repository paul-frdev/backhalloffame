const { createSlideModel, getSlidesModel, getSlideIdModel, updateSlideModel, deleteSlideByIdModel } = require('../models/slidesModel');

import { Request, Response } from 'express';

const asyncHandler = require('express-async-handler');

const createSlide = asyncHandler(async (req: Request, res: Response) => {
  const { title, image, slideType } = req.body;

  try {
    const response = await createSlideModel(title, image, slideType);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const getSlides = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getSlides = await getSlidesModel();

    return res.json(getSlides);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

const getSlideById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getSlideIdModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const updateSlide = asyncHandler(async (req: Request, res: Response) => {
  const { title, image, type } = req.body;
  const { id } = req.params;
  try {
    const response = await updateSlideModel(id, title, image, type);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSlideId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteSlideByIdModel(id);
    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

module.exports = { createSlide, getSlides, deleteSlideId, getSlideById, updateSlide };
