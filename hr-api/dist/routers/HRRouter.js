"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HRController_1 = require("../controllers/HRController");
const Token_1 = require("../helpers/Token");
const RoleVerify_1 = require("../middleware/RoleVerify");
const router = (0, express_1.Router)();
router.put('/approval/leave-request/:id', RoleVerify_1.roleVerifyHRAndManager, HRController_1.approvalLeaveRequest);
router.post('/employee', 
// exampleMiddleware,
// tokenVerify,
// roleVerifyHRAndManager,
// validatorCreateEmployee,
// handleErrorValidator,
HRController_1.createEmployeeAccount);
router.post('/verify-account', Token_1.tokenVerify, HRController_1.updateEmployeeStatus);
exports.default = router;
