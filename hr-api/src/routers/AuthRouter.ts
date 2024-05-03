import { Router } from 'express';
import { login, sendMail } from '../controllers/AuthController';

const router = Router();

router.post('/login', login);
router.post('/send-mail', sendMail);

export default router;
