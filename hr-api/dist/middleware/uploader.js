"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const Multer_1 = require("../helpers/Multer");
const DeletedUploadFiile_1 = require("../helpers/DeletedUploadFiile");
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
            (0, DeletedUploadFiile_1.deletedUploadFile)(req.files);
            next({
                status: 500,
                message: error.message,
            });
        }
    });
};
exports.uploader = uploader;
