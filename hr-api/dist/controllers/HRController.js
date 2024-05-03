"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeStatus = exports.createEmployeeAccount = exports.approvalLeaveRequest = void 0;
const HRServices_1 = require("../services/HRServices");
const HRServices_2 = require("../services/HRServices");
const Hashing_1 = require("../helpers/Hashing");
const TransporterMailer_1 = require("../helpers/TransporterMailer");
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const Token_1 = require("../helpers/Token");
const approvalLeaveRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, HRServices_1.updateLeaveRequest)({ id: parseInt(id) });
        res.status(201).send({
            error: false,
            message: 'Approve Success!',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.approvalLeaveRequest = approvalLeaveRequest;
const createEmployeeAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, fullname, password, positionId, shiftId, address } = req.body;
        console.log('Masuk ke Controller Ngab!');
        const hashPassword = yield (0, Hashing_1.HashPassword)({ password });
        const createEmployeeResult = yield (0, HRServices_2.createEmployee)({
            email,
            fullname,
            password: hashPassword,
            positionId,
            shiftId,
            address,
        });
        const token = yield (0, Token_1.createToken)({ uid: createEmployeeResult.uid });
        const verificationHTML = fs_1.default.readFileSync('./src/public/template/Verification.html', 'utf-8');
        let verificationHTMLCompiled = yield handlebars_1.default.compile(verificationHTML);
        verificationHTMLCompiled = verificationHTMLCompiled({
            username: fullname,
            link: `http://localhost:3000/verify/${token}`,
        });
        TransporterMailer_1.TransporterNodemailer.sendMail({
            from: 'HR-APP',
            to: email,
            subject: 'Active Your Account',
            html: verificationHTMLCompiled,
        });
        res.status(201).send({
            error: false,
            message: 'Create Employee Success!',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createEmployeeAccount = createEmployeeAccount;
const updateEmployeeStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { payload } = req;
        console.log(payload);
        yield (0, HRServices_1.updateEmployeVerifyToken)({ uid: payload.uid });
    }
    catch (error) {
        next(error);
    }
});
exports.updateEmployeeStatus = updateEmployeeStatus;
