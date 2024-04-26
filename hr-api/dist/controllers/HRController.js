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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeAccount = exports.approvalLeaveRequest = void 0;
const HRServices_1 = require("../services/HRServices");
const HRServices_2 = require("../services/HRServices");
const Hashing_1 = require("../helpers/Hashing");
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
        yield (0, HRServices_2.createEmployee)({
            email,
            fullname,
            password: hashPassword,
            positionId,
            shiftId,
            address,
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
