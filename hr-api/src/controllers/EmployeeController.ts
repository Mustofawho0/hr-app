import { NextFunction, Request, Response } from 'express';
import {
  createProfileAndImagesProfile,
  createAttendanceClockin,
  createAttendanceClockout,
  createLeaveEmployeeRequest,
  findPosition,
  findShift,
  updateProfileAndImagesProfile,
} from '../services/EmployeeServices';
import { IReqAccessToken } from '../helpers/Token';
import { deletedUploadFile } from '../helpers/DeletedUploadFiile';

export const clockin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqToken = req as IReqAccessToken;
  const { uid } = reqToken.payload;
  try {
    await createAttendanceClockin({ uid });

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

export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = JSON.parse(req.body.data);
  const reqToken = req as IReqAccessToken;
  const { uid } = reqToken.payload;

  try {
    if (req.files) {
      const uploadedFiles = Array.isArray(req.files)
        ? req.files
        : req.files['images'];

      await createProfileAndImagesProfile(data, uploadedFiles, uid);
    }

    res.status(201).send({
      error: false,
      message: 'Create Profile Success!',
      data: null,
    });
  } catch (error) {
    deletedUploadFile(req.files);
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payload } = req as IReqAccessToken;
    const data = JSON.parse(req.body.data);

    if (req.files) {
      const uploadedFiles = Array.isArray(req.files)
        ? req.files
        : req.files['images'];
      const employeeImagesProfileToDelete = await updateProfileAndImagesProfile(
        data,
        uploadedFiles,
        payload.uid
      );
    }
    res.status(201).send({
      error: false,
      message: 'Update Profile Success!',
      data: null,
    });
  } catch (error) {
    deletedUploadFile(req.files);
    next(error);
  }
};

// export const employeeVerify = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// )=>{
//   try {
//     const { payload } = req as IReqAccessToken;
//     const data = JSON.parse(req.body.data);

//   } catch (error) {
//     next(error)
//   }
// }
