import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config();

export const createToken = ({ uid }: { uid: string }) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1h',
  });
};

export interface IReqAccessToken extends Request {
  payload: any;
  headers: {
    token: string;
  };
}

export const tokenVerify = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { token } = reqToken.headers;

    if (!token) throw new Error('Token Must Provided!');

    const payload = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    );
    reqToken.payload = payload;
    next();
  } catch (error: any) {
    next(error);
  }
};
