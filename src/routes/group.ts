import * as express from 'express';
import { getGroupListByUserId, getLastMessageByGroupId } from '../controller/groupController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get('/list/:id', asyncHandler(getGroupListByUserId));
router.get('/message/:id', asyncHandler(getLastMessageByGroupId));

export default router;