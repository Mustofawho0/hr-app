import express, { Router } from 'express';
import EmployeeRouter from './EmployeeRouter';
import HRRouter from './HRRouter';
import AuthRouter from './AuthRouter';

const router = Router();

router.use(express.json());

router.use('/employee', EmployeeRouter);
router.use('/hr', HRRouter);
router.use('/auth', AuthRouter);

export default router;
