"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const Multer_1 = require("../helpers/Multer");
const fs_1 = require("fs");
const uploader = (req, res, next) => {
    const upload = Multer_1.multerUpload.fields([{ name: 'images', maxCount: 3 }]);
    upload(req, res, function (err) {
        try {
            if (err)
                throw err;
            if (req.files) {
                const uploadFiles = Array.isArray(req.files)
                    ? req.files
                    : req.files['images'];
                if (Array.isArray(uploadFiles)) {
                    uploadFiles === null || uploadFiles === void 0 ? void 0 : uploadFiles.forEach((item) => {
                        if (item.size > 1000000) {
                            throw { message: `${item.originalname} is To Large` };
                        }
                    });
                }
            }
            next();
        }
        catch (error) {
            if (req.files) {
                const uploadFiles = Array.isArray(req.files)
                    ? req.files
                    : req.files['images'];
                if (Array.isArray(uploadFiles)) {
                    uploadFiles === null || uploadFiles === void 0 ? void 0 : uploadFiles.forEach((item) => {
                        (0, fs_1.rmSync)(item.path);
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
exports.uploader = uploader;
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
