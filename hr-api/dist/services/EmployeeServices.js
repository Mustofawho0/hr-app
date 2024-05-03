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
exports.updateProfileAndImagesProfile = exports.createProfileAndImagesProfile = exports.findShift = exports.findPosition = exports.createLeaveEmployeeRequest = exports.createAttendanceClockout = exports.createAttendanceClockin = void 0;
const date_fns_1 = require("date-fns");
const connection_1 = require("../connection");
const createAttendanceClockin = (_a) => __awaiter(void 0, [_a], void 0, function* ({ uid }) {
    yield connection_1.prisma.attendance.create({
        data: {
            date: new Date(),
            clockin: new Date(),
            deduction: 0,
            employeeId: uid,
        },
    });
});
exports.createAttendanceClockin = createAttendanceClockin;
const createAttendanceClockout = (_b) => __awaiter(void 0, [_b], void 0, function* ({ attendanceId, employeeid, }) {
    const findAttendanceAndEmployee = yield connection_1.prisma.attendance.findUnique({
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
    const attendanceUpdate = yield connection_1.prisma.attendance.update({
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
        yield connection_1.prisma.attendance.update({
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
    yield connection_1.prisma.leaveRequest.create({
        data: {
            stardDate: new Date(startDate),
            endDate: new Date(endDate),
            employeeId: employeeid,
        },
    });
});
exports.createLeaveEmployeeRequest = createLeaveEmployeeRequest;
const findPosition = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.position.findMany();
});
exports.findPosition = findPosition;
const findShift = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.shift.findMany();
});
exports.findShift = findShift;
const createProfileAndImagesProfile = (data, images, uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createEmployeeProfile = yield tx.employeeProfile.create({
            data: {
                birthDate: new Date(data.birthDate),
                address: data.address,
                employeeId: uid,
            },
        });
        const imageToCreate = [];
        images.forEach((item) => {
            imageToCreate.push({
                url: item.path,
                employeeProfileId: createEmployeeProfile.id,
            });
        });
        yield tx.employeeImagesProfile.createMany({
            data: [...imageToCreate],
        });
    }));
});
exports.createProfileAndImagesProfile = createProfileAndImagesProfile;
const updateProfileAndImagesProfile = (data, images, uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const findEmployeeProfile = yield tx.employeeProfile.findUnique({
            where: {
                employeeId: uid,
            },
        });
        if (!findEmployeeProfile)
            throw new Error('Employee Profile Not Found');
        yield tx.employeeProfile.update({
            where: {
                employeeId: uid,
            },
            data: {
                birthDate: new Date(data.birthDate),
                address: data.address,
            },
        });
        const findEmployeeImagesProfile = yield tx.employeeImagesProfile.findMany({
            where: {
                employeeProfileId: findEmployeeProfile.id,
            },
        });
        yield tx.employeeImagesProfile.deleteMany({
            where: {
                employeeProfileId: findEmployeeProfile.id,
            },
        });
        const imageToUpdate = [];
        images.forEach((item) => {
            imageToUpdate.push({
                url: item.path,
                employeeProfileId: findEmployeeProfile.id,
            });
        });
        yield tx.employeeImagesProfile.createMany({
            data: [...imageToUpdate],
        });
    }));
    // if (findEmployeeProfileImage) {
    //   images.forEach((item: any) => {
    //     updateToImage.push({
    //       url: item.path
    //     })
    //     rmSync(item.path)
    //   });
});
exports.updateProfileAndImagesProfile = updateProfileAndImagesProfile;
