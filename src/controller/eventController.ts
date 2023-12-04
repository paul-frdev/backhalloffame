const {
  createEventModel,
  getAllEventsModel,
  getALlPublishedEventsModel,
  getPublishedEventIdModel,
  deleteEventModel,
} = require("../models/eventModel");
const { getTimeOptionsModel } = require("../models/timeOptionsModel");

import { Request, Response } from "express";

const asyncHandler = require("express-async-handler");

const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    descriptionText,
    date,
    address,
    publishDate,
    time,
    images,
    adultPrice,
    childPrice,
    adultQuantityTickets,
    childrenQuantityTickets,
    ticketImg,
  } = req.body;

  try {
    const response = await createEventModel(
      title,
      descriptionText,
      date,
      publishDate,
      time,
      images,
      address,
      adultPrice,
      childPrice,
      adultQuantityTickets,
      childrenQuantityTickets,
      ticketImg,
    );

    return res.json(response);
  } catch (error) {
    console.error("error", error);
    throw new Error(error);
  }
});

const getAllEvents = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getArticles = await getAllEventsModel();

    return res.json(getArticles);
  } catch (error) {
    console.error("error");

    throw new Error(error);
  }
});

const getAllPublishedEvents = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const getEvents = await getALlPublishedEventsModel();

      return res.json(getEvents);
    } catch (error) {
      console.error("error");

      throw new Error(error);
    }
  },
);

const getPublishedEventById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const eventById = await getPublishedEventIdModel(id);

      return res.json(eventById);
    } catch (error) {
      console.error("error");

      throw new Error(error);
    }
  },
);

const deleteEventById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteEventModel(id);
    return res.json(response);
  } catch (error) {
    console.error("error", error);
    throw new Error(error);
  }
});

// time options
const getTimeOptions = asyncHandler(async (req: Request, res: Response) => {
  try {
    const getArticles = await getTimeOptionsModel();

    return res.json(getArticles);
  } catch (error) {
    console.error("error");

    throw new Error(error);
  }
});

module.exports = {
  createEvent,
  getAllEvents,
  getAllPublishedEvents,
  getPublishedEventById,
  getTimeOptions,
  deleteEventById,
};
