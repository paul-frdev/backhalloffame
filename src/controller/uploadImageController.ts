import { Request, Response } from "express";

const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
  getCloudinaryImage,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req: any, res: Response) => {
  try {
    const uploader = (path: string) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });

    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImages = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await cloudinaryDeleteImg(id, "images");

    res.json({ message: "Image deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const getImageById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const image = await getCloudinaryImage(id);

    return res.json(image);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { uploadImages, deleteImages, getImageById };
