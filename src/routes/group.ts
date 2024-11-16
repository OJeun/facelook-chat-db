import * as express from 'express';
import { getGroupListByUserId, getLastMessageByGroupId, createGroup} from '../controller/groupController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get('/list/:id', asyncHandler(getGroupListByUserId));
router.get('/message/:id', asyncHandler(getLastMessageByGroupId));
router.post('/create', asyncHandler(asyncHandler(createGroup)));

export default router;