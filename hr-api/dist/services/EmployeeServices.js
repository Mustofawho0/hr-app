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
exports.findShift = exports.findPosition = exports.createLeaveEmployeeRequest = exports.createAttendanceClockout = exports.createAttendanceClockin = void 0;
const date_fns_1 = require("date-fns");
const connection_1 = require("../connection");
const createAttendanceClockin = (_a) => __awaiter(void 0, [_a], void 0, function* ({ employeeid, }) {
    yield connection_1.prisma.attendances.create({
        data: {
            date: new Date(),
            clockin: new Date(),
            deduction: 0,
            employeeId: employeeid,
        },
    });
});
exports.createAttendanceClockin = createAttendanceClockin;
const createAttendanceClockout = (_b) => __awaiter(void 0, [_b], void 0, function* ({ attendanceId, employeeid, }) {
    const findAttendanceAndEmployee = yield connection_1.prisma.attendances.findUnique({
        where: {
            id: attendanceId,
            employeeId: employeeid,
        },
        include: {
            employee: {
                include: {
                    shift: true,
                    position: true,
                },
            },
        },
    });
    if (!findAttendanceAndEmployee)
        return null;
    const attendanceUpdate = yield connection_1.prisma.attendances.update({
        data: {
            clockout: new Date(),
        },
        where: {
            id: attendanceId,
            employeeId: employeeid,
        },
    });
    const differentInMinutesClockin = (0, date_fns_1.differenceInMinutes)(findAttendanceAndEmployee.clockin, findAttendanceAndEmployee.employee.shift.start);
    if (attendanceUpdate.clockout) {
        const differentInMinutesClockout = (0, date_fns_1.differenceInMinutes)(attendanceUpdate.clockout, findAttendanceAndEmployee.employee.shift.end);
        const totalMinutes = Math.floor((differentInMinutesClockin + Math.abs(differentInMinutesClockout)) / 30);
        const deduction = totalMinutes *
            (findAttendanceAndEmployee.employee.position.salary * 0.001);
        yield connection_1.prisma.attendances.update({
            data: {
                deduction,
            },
            where: {
                employeeId: employeeid,
                id: attendanceId,
            },
        });
    }
});
exports.createAttendanceClockout = createAttendanceClockout;
const createLeaveEmployeeRequest = (_c) => __awaiter(void 0, [_c], void 0, function* ({ startDate, endDate, employeeid, }) {
    yield connection_1.prisma.leaveRequests.create({
        data: {
            stardDate: new Date(startDate),
            endDate: new Date(endDate),
            employeeId: employeeid,
        },
    });
});
exports.createLeaveEmployeeRequest = createLeaveEmployeeRequest;
const findPosition = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.positions.findMany();
});
exports.findPosition = findPosition;
const findShift = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.shifts.findMany();
});
exports.findShift = findShift;
