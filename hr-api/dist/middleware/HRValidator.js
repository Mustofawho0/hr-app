"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorCreateEmployee = void 0;
const express_validator_1 = require("express-validator");
exports.validatorCreateEmployee = [
    (0, express_validator_1.body)(['email', 'fullname', 'password', 'positionId', 'shiftId', 'address'])
        .notEmpty()
        .withMessage('Data Must Completed!'),
    (0, express_validator_1.body)('email').isString().isEmail().withMessage('Email Must Valid!'),
    (0, express_validator_1.body)('password')
        .isString()
        .isLength({ min: 5, max: 15 })
        .withMessage('Password Have Minimum 5 Character and Maximum 15 Character'),
    (0, express_validator_1.body)(['positionId', 'shiftId'])
        .not()
        .isString()
        .withMessage('Positionid or ShiftId Type is Number'),
];
