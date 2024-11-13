import * as express from 'express';
import { getAllChatsByGroupId, get20ChatsByGroupId, saveChatMessages } from '../controller/chatController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get('/allChats/:id', asyncHandler(getAllChatsByGroupId));
router.get('/20Chats/:id', asyncHandler(get20ChatsByGroupId));
router.post('/saveChats', asyncHandler(saveChatMessages));

export default router;