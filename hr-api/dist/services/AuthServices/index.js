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
exports.findEmployeeByUid = exports.findEmployeeByEmail = void 0;
const connection_1 = require("../../connection");
const findEmployeeByEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, }) {
    const findEmployee = yield connection_1.prisma.employees.findFirst({
        where: {
            email,
        },
    });
    if (!findEmployee)
        throw new Error('User Not Found!');
    return findEmployee;
});
exports.findEmployeeByEmail = findEmployeeByEmail;
const findEmployeeByUid = (_b) => __awaiter(void 0, [_b], void 0, function* ({ uid }) {
    return yield connection_1.prisma.employees.findUnique({
        where: {
            uid,
        },
        include: {
            position: true,
        },
    });
});
exports.findEmployeeByUid = findEmployeeByUid;
