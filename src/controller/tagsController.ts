import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');

const { getAllTagsModel } = require('../models/tagsModel');

const getTags = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getAllTagsModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { getTags };
