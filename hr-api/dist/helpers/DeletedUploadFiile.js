"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedUploadFile = void 0;
const fs_1 = require("fs");
const deletedUploadFile = (files) => {
    if (files) {
        const uploadFiles = Array.isArray(files) ? files : files['images'];
        if (Array.isArray(uploadFiles)) {
            uploadFiles === null || uploadFiles === void 0 ? void 0 : uploadFiles.forEach((item) => {
                if (item.path)
                    (0, fs_1.rmSync)(item.path);
                if (item.url)
                    (0, fs_1.rmSync)(item.url);
            });
        }
    }
};
exports.deletedUploadFile = deletedUploadFile;
