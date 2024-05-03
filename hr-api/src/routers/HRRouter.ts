import { Router } from 'express';
import {
  approvalLeaveRequest,
  createEmployeeAccount,
  updateEmployeeStatus,
} from '../controllers/HRController';
import { validatorCreateEmployee } from '../middleware/HRValidator';
import { exampleMiddleware } from '../middleware/example';
import { handleErrorValidator } from '../middleware/HandleErrorExpressValidator';
import { tokenVerify } from '../helpers/Token';
import { roleVerifyHRAndManager } from '../middleware/RoleVerify';

const router = Router();

router.put(
  '/approval/leave-request/:id',
  roleVerifyHRAndManager,
  approvalLeaveRequest
);
router.post(
  '/employee',
  // exampleMiddleware,
  // tokenVerify,
  // roleVerifyHRAndManager,
  // validatorCreateEmployee,
  // handleErrorValidator,
  createEmployeeAccount
);
router.post('/verify-account', tokenVerify, updateEmployeeStatus);
export default router;
