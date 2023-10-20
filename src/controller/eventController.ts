const { createEventModel } = require('../models/eventModel');

import { Request, Response } from 'express';

const asyncHandler = require('express-async-handler');

const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    descriptionText,
    event_date,
    event_timeslots,
    imagesToJson,
    location,
    adult_price,
    child_price,
    adult_quantity_tickets,
    children_quantity_tickets,
  } = req.body;

  try {
    const response = await createEventModel(
      title,
      descriptionText,
      event_date,
      event_timeslots,
      imagesToJson,
      location,
      adult_price,
      child_price,
      adult_quantity_tickets,
      children_quantity_tickets
    );

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

module.exports = { createEvent };
