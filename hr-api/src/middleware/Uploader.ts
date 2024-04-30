import { Request, Response, NextFunction } from 'express';
import { multerUpload } from '../helpers/Multer';
import { rmSync } from 'fs';

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
      if (req.files) {
        const uploadFiles = Array.isArray(req.files)
          ? req.files
          : req.files['images'];

        if (Array.isArray(uploadFiles)) {
          uploadFiles?.forEach((item) => {
            rmSync(item.path);
          });
        }
      }
      next({
        status: 500,
        message: error.message,
      });
    }
  });
};

// import { Request } from 'express';
// import multer from 'multer';
// import { join } from 'path';

// type DestinationCallback = (error: Error | null, destination: string) => void;
// type FileNameCallback = (error: Error | null, filename: string) => void;

// export const uploader = (filePrefix: string, folderName?: string) => {
//   const defaultDir = join(__dirname, '../../public');

//   const storage = multer.diskStorage({
//     destination: (
//       req: Request,
//       file: Express.Multer.File,
//       cb: DestinationCallback
//     ) => {
//       const destination = folderName ? defaultDir + folderName : defaultDir;
//       cb(null, destination);
//     },
//     filename: (
//       req: Request,
//       file: Express.Multer.File,
//       cb: FileNameCallback
//     ) => {
//       const originalNameParts = file.originalname.split('.');
//       const fileExtension = originalNameParts[originalNameParts.length - 1];
//       const newFileName = filePrefix + Date.now() + '.' + fileExtension;

//       cb(null, newFileName);
//     },
//   });
//   return multer({ storage: storage });
// };
