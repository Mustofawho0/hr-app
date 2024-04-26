import { NextFunction, Response, Request } from 'express';

export const exampleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Lewatin Middleware Ngab!');
  next();
};
