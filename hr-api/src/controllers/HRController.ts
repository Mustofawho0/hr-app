import { NextFunction, Request, Response } from 'express';
import { updateLeaveRequest } from '../services/HRServices';
import { createEmployee } from '../services/HRServices';
import { HashPassword } from '../helpers/Hashing';

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

    await createEmployee({
      email,
      fullname,
      password: hashPassword,
      positionId,
      shiftId,
      address,
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
