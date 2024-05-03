"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransporterNodemailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.TransporterNodemailer = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'mustofa.uyee@gmail.com',
        pass: 'uassbffievscekqn',
    },
    tls: {
        rejectUnauthorized: false,
    },
});
