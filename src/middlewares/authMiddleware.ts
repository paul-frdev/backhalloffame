import { NextFunction, Request, Response } from "express";
const { getUserById } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        const user = await getUserById(decoded?.user.id);
        req.user = user.user_id;
        next();
      } catch (error) {
        throw new Error("Not Authorized token expired, Please Login again");
      }
    } else {
      throw new Error(" There is no token attached to header");
    }
  },
);

module.exports = authMiddleware;
