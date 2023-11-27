import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');

const { getTestimonialAdminTagModel, getProductTagsModel, getTestimonialUserTagModel } = require('../models/tagsModel');

const getProductTags = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getProductTagsModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getTestimonialAdminTag = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getTestimonialAdminTagModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getTestimonialUserTag = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getTestimonialUserTagModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { getProductTags, getTestimonialAdminTag, getTestimonialUserTag };
