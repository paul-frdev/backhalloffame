import { Request, Response, NextFunction } from 'express';

module.exports = function (req: Request, res: Response, next: NextFunction) {
  const { email, name, password, mobile } = req.body;

  function validEmail(userEmail: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/register') {
    if (![email, name, password, mobile].every(Boolean)) {
      return res.json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.json('Invalid Email');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.json('Invalid Email');
    }
  }

  next();
};
