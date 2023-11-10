const { createEventModel, getAllEventsModel, getALlPublishedEventsModel, getPublishedEventIdModel } = require('../models/eventModel');

import { Request, Response } from 'express';

const asyncHandler = require('express-async-handler');

const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    descriptionText,
    address,
    date,
    publishDate,
    time,
    images,
    ticketImg,
    adultPrice,
    childPrice,
    adultQuantityTickets,
    childrenQuantityTickets,
  } = req.body;

  console.log(
    title,
    descriptionText,
    date,
    address,
    time,
    images,
    ticketImg,
    adultPrice,
    childPrice,
    adultQuantityTickets,
    childrenQuantityTickets,
    publishDate,
  );

  try {
    const response = await createEventModel(
      title,
      descriptionText,
      address,
      date,
      time,
      images,
      ticketImg,
      adultPrice,
      childPrice,
      adultQuantityTickets,
      childrenQuantityTickets,
      publishDate,
    );

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});


const getAllEvents = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getArticles = await getAllEventsModel();

    return res.json(getArticles);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});


const getAllPublishedEvents = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getEvents = await getALlPublishedEventsModel();
    
    return res.json(getEvents);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

const getPublishedEventById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const eventById = await getPublishedEventIdModel(id);

    return res.json(eventById);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

module.exports = { createEvent, getAllEvents, getAllPublishedEvents, getPublishedEventById };
