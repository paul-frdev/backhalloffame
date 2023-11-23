import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');
const {
  createTestimonialModel,
  getTestimonialsModel,
  getTestimonialIdModel,
  updateTestimonialModel,
  updateIsActiveTestimonialModel,
  deleteTestimonialByIdModel,
} = require('../models/testimonialsModel');

const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const { image, desriptiontext, author, dignity, is_active } = req.body;
  console.log(image, desriptiontext, author, dignity, is_active);
  try {
    const response = await createTestimonialModel(image, desriptiontext, author, dignity, is_active);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const getTestimonials = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getTestimonials = await getTestimonialsModel();
    const formattedTestimonials = getTestimonials.map((item: any) => ({
      testimonial_id: item.testimonial_id,
      image: item.testimonial_image,
      desriptiontext: item.testimonial_description,
      author: item.testimonial_author,
      dignity: item.testimonial_dignity,
      is_active: item.is_active,
    }));

    return res.json(formattedTestimonials);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

const getTestimonialById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getTestimonialIdModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const updateTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const { image, desriptiontext, author, dignity } = req.body;
  const { id } = req.params;
  try {
    const response = await updateTestimonialModel(id, image, desriptiontext, author, dignity);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const updateIsActiveTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await updateIsActiveTestimonialModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteTestimonialId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteTestimonialByIdModel(id);
    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

module.exports = { createTestimonial, getTestimonials, getTestimonialById, updateTestimonial, updateIsActiveTestimonial, deleteTestimonialId };
