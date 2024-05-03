import { NextFunction, Request, Response } from 'express';
import {
  updateEmployeVerifyToken,
  updateLeaveRequest,
} from '../services/HRServices';
import { createEmployee } from '../services/HRServices';
import { HashPassword } from '../helpers/Hashing';
import { TransporterNodemailer } from '../helpers/TransporterMailer';
import fs from 'fs';
import Handlebars from 'handlebars';
import { createToken } from '../helpers/Token';
import { IReqAccessToken } from '../helpers/Token';

export const approvalLeaveRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await updateLeaveRequest({ id: parseInt(id) });
    res.status(201).send({
      error: false,
      message: 'Approve Success!',
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const createEmployeeAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, fullname, password, positionId, shiftId, address } =
      req.body;
    console.log('Masuk ke Controller Ngab!');
    const hashPassword = await HashPassword({ password });

    const createEmployeeResult = await createEmployee({
      email,
      fullname,
      password: hashPassword,
      positionId,
      shiftId,
      address,
    });

    const token = await createToken({ uid: createEmployeeResult.uid });

    const verificationHTML = fs.readFileSync(
      './src/public/template/Verification.html',
      'utf-8'
    );
    let verificationHTMLCompiled: any = await Handlebars.compile(
      verificationHTML
    );
    verificationHTMLCompiled = verificationHTMLCompiled({
      username: fullname,
      link: `http://localhost:3000/verify/${token}`,
    });

    TransporterNodemailer.sendMail({
      from: 'HR-APP',
      to: email,
      subject: 'Active Your Account',
      html: verificationHTMLCompiled,
    });
    res.status(201).send({
      error: false,
      message: 'Create Employee Success!',
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateEmployeeStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payload } = req as IReqAccessToken;
    console.log(payload);

    await updateEmployeVerifyToken({ uid: payload.uid });
  } catch (error) {
    next(error);
  }
};
