const {
  createSizeModel,
  updateSizeModel,
  deleteSizeModel,
  getSizeByIdModel,
  getAllSizesModel,
} = require("../models/sizesModel");
import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");

const createSize = asyncHandler(async (req: Request, res: Response) => {
  const { size_name } = req.body;

  try {
    const response = await createSizeModel(size_name);

    return res.json(response);
  } catch (error) {
    console.error("error", error);
    throw new Error(error);
  }
});

const updateSize = asyncHandler(async (req: Request, res: Response) => {
  const { size_name } = req.body;
  const { id } = req.params;
  try {
    const response = await updateSizeModel(id, size_name);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSize = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteSizeModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getSizeById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getSizeByIdModel(id);

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getallSizes = asyncHandler(async (req: Request, res: Response) => {
  try {
    const response = await getAllSizesModel();

    return res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createSize,
  updateSize,
  deleteSize,
  getSizeById,
  getallSizes,
};
