import { Router } from 'express';
import {
  clockin,
  clockout,
  createProfile,
  employeePosition,
  employeeShift,
  leaveRequest,
  updateProfile,
} from '../controllers/EmployeeController';
import { tokenVerify } from '../helpers/Token';
import { uploader } from '../middleware/Uploader';

const router = Router();

router.post('/clockin', tokenVerify, clockin);
router.put('/clockout/:attendanceId', tokenVerify, clockout);
router.post('/leave', tokenVerify, leaveRequest);
router.get('/position', employeePosition);
router.get('/shift', employeeShift);
router.post('/upload-image', tokenVerify, uploader, createProfile);
router.put('/update-image', tokenVerify, uploader, updateProfile);

export default router;
