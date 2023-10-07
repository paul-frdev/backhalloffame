import 'express-serve-static-core';

export interface User {
  id: string;
  firstName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
