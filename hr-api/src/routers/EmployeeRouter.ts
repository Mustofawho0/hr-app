import { Router } from 'express';
import {
  clockin,
  clockout,
  employeePosition,
  employeeShift,
  leaveRequest,
} from '../controllers/EmployeeController';
import { tokenVerify } from '../helpers/Token';

const router = Router();

router.post('/clockin', tokenVerify, clockin);
router.put('/clockout/:attendanceId', tokenVerify, clockout);
router.post('/leave', tokenVerify, leaveRequest);
router.get('/position', employeePosition);
router.get('/shift', employeeShift);

export default router;
