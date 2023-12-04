import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");

const {
  createRefundModel,
  getRefundModel,
  getRefundModelId,
  updateRefundModel,
} = require("../models/refundModel");

const createRefund = asyncHandler(async (req: Request, res: Response) => {
  const { refund_text } = req.body;

  try {
    const response = await createRefundModel(refund_text);

    return res.json(response);
  } catch (error) {
    console.error("error", error);
    throw new Error(error);
  }
});

const getRefund = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getRefundModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getRefundId = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getRefundModelId(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const updateRefund = asyncHandler(async (req: Request, res: Response) => {
  const { refund_text } = req.body;
  const { id } = req.params;

  try {
    const response = await updateRefundModel(id, refund_text);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createRefund, getRefund, getRefundId, updateRefund };
