import { NextFunction, Request, Response } from 'express';
import { findEmployeeByEmail } from '../services/AuthServices';
import { ComparePassword } from '../helpers/Hashing';
import { createToken } from '../helpers/Token';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const findEmployeeByEmailResult = await findEmployeeByEmail({ email });
    const comparePasswordResult = await ComparePassword({
      passwordFormClient: password,
      passwordFromDatabase: findEmployeeByEmailResult.password,
    });
    if (!comparePasswordResult) throw new Error("Password Doesn't Match");

    const token = await createToken({
      uid: findEmployeeByEmailResult.uid,
    });

    res.status(200).send({
      error: false,
      message: 'Login Success!',
      data: {
        token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};
