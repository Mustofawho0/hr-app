"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorValidator = void 0;
const express_validator_1 = require("express-validator");
const handleErrorValidator = (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (errorResult.isEmpty() === false) {
        res.status(300).send({
            error: true,
            message: errorResult.array()[0].msg,
            data: null,
        });
    }
    else {
        next();
    }
};
exports.handleErrorValidator = handleErrorValidator;
