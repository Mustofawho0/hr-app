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
exports.login = void 0;
const AuthServices_1 = require("../services/AuthServices");
const Hashing_1 = require("../helpers/Hashing");
const Token_1 = require("../helpers/Token");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findEmployeeByEmailResult = yield (0, AuthServices_1.findEmployeeByEmail)({ email });
        const comparePasswordResult = yield (0, Hashing_1.ComparePassword)({
            passwordFormClient: password,
            passwordFromDatabase: findEmployeeByEmailResult.password,
        });
        if (!comparePasswordResult)
            throw new Error("Password Doesn't Match");
        const token = yield (0, Token_1.createToken)({
            uid: findEmployeeByEmailResult.uid,
        });
        res.status(200).send({
            error: false,
            message: 'Login Success!',
            data: {
                token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
