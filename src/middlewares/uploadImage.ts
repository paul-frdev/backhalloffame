import { NextFunction, Request } from "express";

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback,
  ) {
    cb(null, path.join(__dirname, "../../public/images/"));
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback,
  ) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

const blogImgResize = async (req: Request, res: any, next: NextFunction) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file: any) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/blogs/${file.filename}`);
      fs.unlinkSync(`public/images/blogs/${file.filename}`);
    }),
  );
  next();
};

const productImgResize = async (req: any, res: any, next: NextFunction) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file: any) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(`public/images/products/${file.filename}`);
    }),
  );
  next();
};

module.exports = { uploadPhoto, blogImgResize, productImgResize };
