"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedUploadFile = void 0;
const fs_1 = require("fs");
const deletedUploadFile = (files) => {
    if (files) {
        const uploadFiles = Array.isArray(files) ? files : files['images'];
        if (Array.isArray(uploadFiles)) {
            uploadFiles === null || uploadFiles === void 0 ? void 0 : uploadFiles.forEach((item) => {
                (0, fs_1.rmSync)(item.path);
            });
        }
    }
};
exports.deletedUploadFile = deletedUploadFile;
