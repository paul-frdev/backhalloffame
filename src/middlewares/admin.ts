import { NextFunction, Request, Response } from "express";
const { pool } = require("../config/dbConnect");
const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = `SELECT u.first_name, r.role_name, r.permissions FROM users u JOIN roles r ON u.role_id = r.role_id WHERE u.user_id = '${req.user}'`;

    const adminUser = await pool.query(query);

    if (adminUser.rows[0].role_name === "admin") {
      next();
    } else {
      return res.status(403).json("Access denied");
    }
  },
);

module.exports = isAdmin;
