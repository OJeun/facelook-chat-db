import { Router } from 'express';
import { register, login } from '../controller/authController';
// Import in other files
import asyncHandler from '../utils/asyncHandler';


const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));


