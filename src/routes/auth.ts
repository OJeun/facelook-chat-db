import { Router } from 'express';
import { register, login } from '../controller/authController';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

export default router;