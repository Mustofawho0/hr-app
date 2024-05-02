import { Request, Response, NextFunction } from 'express';
import { multerUpload } from '../helpers/Multer';
import { rmSync } from 'fs';
import { deletedUploadFile } from '../helpers/DeletedUploadFiile';

export const uploader = (req: Request, res: Response, next: NextFunction) => {
  const upload = multerUpload.fields([{ name: 'images', maxCount: 3 }]);

  upload(req, res, function (err) {
    try {
      if (err) throw err;

      if (req.files) {
        const uploadFiles = Array.isArray(req.files)
          ? req.files
          : req.files['images'];

        if (Array.isArray(uploadFiles)) {
          uploadFiles?.forEach((item) => {
            if (item.size > 1000000) {
              throw { message: `${item.originalname} is To Large` };
            }
          });
        }
      }
      next();
    } catch (error: any) {
      deletedUploadFile(req.files);
      next({
        status: 500,
        message: error.message,
      });
    }
  });
};
