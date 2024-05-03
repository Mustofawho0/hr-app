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
exports.updateProfile = exports.createProfile = exports.employeeShift = exports.employeePosition = exports.leaveRequest = exports.clockout = exports.clockin = void 0;
const EmployeeServices_1 = require("../services/EmployeeServices");
const DeletedUploadFiile_1 = require("../helpers/DeletedUploadFiile");
const clockin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqToken = req;
    const { uid } = reqToken.payload;
    try {
        yield (0, EmployeeServices_1.createAttendanceClockin)({ uid });
        res.status(201).send({
            error: false,
            message: 'Clockin Success',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.clockin = clockin;
const clockout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { attendanceId } = req.params;
        const { employeeid } = req.headers;
        yield (0, EmployeeServices_1.createAttendanceClockout)({
            attendanceId: parseInt(attendanceId),
            employeeid,
        });
        res.status(201).send({
            error: false,
            message: 'Clockout Success!',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.clockout = clockout;
const leaveRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.body;
        const { employeeid } = req.headers;
        yield (0, EmployeeServices_1.createLeaveEmployeeRequest)({ startDate, endDate, employeeid });
        res.status(201).send({
            error: false,
            message: 'Leave Request Success!',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.leaveRequest = leaveRequest;
const employeePosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeePosition = yield (0, EmployeeServices_1.findPosition)();
        res.status(200).send({
            error: false,
            message: 'Get Employee Position Success',
            data: employeePosition,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.employeePosition = employeePosition;
const employeeShift = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeShift = yield (0, EmployeeServices_1.findShift)();
        res.status(200).send({
            error: false,
            message: 'Get Employee Shift Success',
            data: employeeShift,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.employeeShift = employeeShift;
const createProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(req.body.data);
    const reqToken = req;
    const { uid } = reqToken.payload;
    try {
        if (req.files) {
            const uploadedFiles = Array.isArray(req.files)
                ? req.files
                : req.files['images'];
            yield (0, EmployeeServices_1.createProfileAndImagesProfile)(data, uploadedFiles, uid);
        }
        res.status(201).send({
            error: false,
            message: 'Create Profile Success!',
            data: null,
        });
    }
    catch (error) {
        (0, DeletedUploadFiile_1.deletedUploadFile)(req.files);
        next(error);
    }
});
exports.createProfile = createProfile;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { payload } = req;
        const data = JSON.parse(req.body.data);
        if (req.files) {
            const uploadedFiles = Array.isArray(req.files)
                ? req.files
                : req.files['images'];
            const employeeImagesProfileToDelete = yield (0, EmployeeServices_1.updateProfileAndImagesProfile)(data, uploadedFiles, payload.uid);
        }
        res.status(201).send({
            error: false,
            message: 'Update Profile Success!',
            data: null,
        });
    }
    catch (error) {
        (0, DeletedUploadFiile_1.deletedUploadFile)(req.files);
        next(error);
    }
});
exports.updateProfile = updateProfile;
// export const employeeVerify = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// )=>{
//   try {
//     const { payload } = req as IReqAccessToken;
//     const data = JSON.parse(req.body.data);
//   } catch (error) {
//     next(error)
//   }
// }
