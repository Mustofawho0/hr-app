import express, { Router } from 'express';
import EmployeeRouter from './EmployeeRouter';
import HRRouter from './HRRouter';
import AuthRouter from './AuthRouter';
// import UploadRouter from './UploadRouter';

const router = Router();
router.use('*/image', express.static('src/public/image'));

router.use(express.json());

router.use('/employee', EmployeeRouter);
router.use('/hr', HRRouter);
router.use('/auth', AuthRouter);

export default router;
