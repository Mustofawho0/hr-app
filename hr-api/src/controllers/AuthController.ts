import { NextFunction, Request, Response } from 'express';
import { findEmployeeByEmail } from '../services/AuthServices';
import { ComparePassword } from '../helpers/Hashing';
import { createToken } from '../helpers/Token';
import { TransporterNodemailer } from '../helpers/TransporterMailer';

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
        fullname: findEmployeeByEmailResult.fullname,
        image:
          findEmployeeByEmailResult.employeeprofile?.employeeimagesprofile[0]
            .url,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const sendMail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await TransporterNodemailer.sendMail({
      from: 'HR-APP',
      to: 'bal.iqbal.mi@gmail.com',
      subject: 'Test Email',
      html: '<h1>Hello World</h1>',
    });
  } catch (error) {
    next(error);
  }
};
