import { NextFunction, Request, Response } from 'express';
import {
  createAttendanceClockin,
  createAttendanceClockout,
  createLeaveEmployeeRequest,
  findPosition,
  findShift,
} from '../services/EmployeeServices';

export const clockin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { employeeid } = req.headers;
  try {
    await createAttendanceClockin({ employeeid });

    res.status(201).send({
      error: false,
      message: 'Clockin Success',
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const clockout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { attendanceId } = req.params;
    const { employeeid } = req.headers;

    await createAttendanceClockout({
      attendanceId: parseInt(attendanceId),
      employeeid,
    });
    res.status(201).send({
      error: false,
      message: 'Clockout Success!',
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const leaveRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate } = req.body;
    const { employeeid } = req.headers;

    await createLeaveEmployeeRequest({ startDate, endDate, employeeid });
    res.status(201).send({
      error: false,
      message: 'Leave Request Success!',
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const employeePosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employeePosition = await findPosition();

    res.status(200).send({
      error: false,
      message: 'Get Employee Position Success',
      data: employeePosition,
    });
  } catch (error: any) {
    next(error);
  }
};
export const employeeShift = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employeeShift = await findShift();

    res.status(200).send({
      error: false,
      message: 'Get Employee Shift Success',
      data: employeeShift,
    });
  } catch (error: any) {
    next(error);
  }
};
