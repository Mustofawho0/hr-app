"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const defaultDirectory = 'src/public';
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const childDirectory = file.mimetype.split('/')[0];
        const isDirectoryExist = fs_1.default.existsSync(`${defaultDirectory}/${childDirectory}`);
        if (isDirectoryExist === false) {
            fs_1.default.mkdirSync(`${defaultDirectory}/${childDirectory}`, {
                recursive: true,
            });
        }
        cb(null, `${defaultDirectory}/${childDirectory}`);
    },
    filename: function (req, file, cb) {
        const randomNumber = Math.ceil(Math.random() * 10000000);
        const splitOriginalName = file.originalname.split('.');
        const fileExtension = splitOriginalName[splitOriginalName.length - 1];
        cb(null, `${Date.now()}_${randomNumber}.${fileExtension}`);
    },
});
const fileFilter = (req, file, cb) => {
    const fileAccepted = ['webp', 'jpg', 'jpeg', 'png'];
    const splitOriginalName = file.originalname.split('.');
    const fileExtension = splitOriginalName[splitOriginalName.length - 1];
    if (fileAccepted.includes(fileExtension)) {
        cb(null, true);
    }
    else {
        cb(new Error('Format Not Accepted!'));
    }
};
exports.multerUpload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
