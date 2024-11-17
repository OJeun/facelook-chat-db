import * as express from 'express';
import { getUserData, getAllAchievementPoints } from '../controller/userController'
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get('/:id', asyncHandler(getUserData));
router.get('/allAchievementPoints', asyncHandler(getAllAchievementPoints));

export default router;