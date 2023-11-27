import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');

const { getAboutModel, createAboutModel, updateAboutModel, getAboutUsModel } = require('../models/aboutModel');

const createAbout = asyncHandler(async (req: Request, res: Response) => {
  const { about_title, about_description } = req.body;

  try {
    const response = await createAboutModel(about_title, about_description);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const getAboutUs = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getAboutUsModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getAbout = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getAboutModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const updateAbout = asyncHandler(async (req: Request, res: Response) => {
  const { about_title, about_description } = req.body;
  const { id } = req.params;
  console.log(id, about_title, about_description);

  try {
    const response = await updateAboutModel(id, about_title, about_description);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { getAbout, createAbout, updateAbout, getAboutUs };
