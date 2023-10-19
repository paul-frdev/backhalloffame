// not Found

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error Handler

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    status: 'fail',
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { errorHandler, notFound };
