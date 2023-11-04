import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');
const { createTicketImageModel, getALlTicketImagesModel, getTicketImageIdModel, deleteTicketImageById } = require('../models/ticketImageModel');

const createNewTicket = asyncHandler(async (req: Request, res: Response) => {
  const { title, images } = req.body;

  console.log(title, images );
  
  try {
    const response = await createTicketImageModel(title, images);

    return res.json(response);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
});

const getAllTickets = asyncHandler(async (req: Request, res: Response) => {
  try {
    const tickets = await getALlTicketImagesModel();

    return res.json(tickets);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

const geTicketById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticketById = await getTicketImageIdModel(id);

    console.log('ticketById', ticketById);

    return res.json(ticketById);
  } catch (error) {
    console.log('error');

    throw new Error(error);
  }
});

const deleteTicket = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteTicketImageById(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createNewTicket, getAllTickets, geTicketById, deleteTicket };
