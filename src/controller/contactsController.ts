import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");

const {
  getContactsModel,
  createContactsModel,
  getContactsModelId,
  updateContactsModel,
} = require("../models/contactsModel");

const createContacts = asyncHandler(async (req: Request, res: Response) => {
  const { contacts_title, contacts_address, contacts_email, contacts_phone } =
    req.body;

  try {
    const response = await createContactsModel(
      contacts_title,
      contacts_address,
      contacts_email,
      contacts_phone,
    );

    return res.json(response);
  } catch (error) {
    console.error("error", error);
    throw new Error(error);
  }
});

const getContacts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getContactsModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getContactsId = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getContactsModelId(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const updateContacts = asyncHandler(async (req: Request, res: Response) => {
  const { contacts_title, contacts_address, contacts_email, contacts_phone } =
    req.body;
  const { id } = req.params;

  try {
    const response = await updateContactsModel(
      id,
      contacts_title,
      contacts_address,
      contacts_email,
      contacts_phone,
    );

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { getContactsId, createContacts, updateContacts, getContacts };
