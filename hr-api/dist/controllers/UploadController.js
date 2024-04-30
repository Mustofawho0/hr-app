"use strict";
// import { Request, Response, NextFunction } from 'express';
// export const addSingleNewImage = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { file } = req;
//     if (!file) throw new Error('No File Uploaded');
//     return res.status(200).send({
//       error: false,
//       message: 'File successfully upload',
//       data: file,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// export const addMultiNewImage = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { files } = req;
//     if (!files?.length) throw new Error('No File Uploaded');
//     return res.status(200).send({
//       error: false,
//       message: 'File successfully upload',
//       data: files,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
