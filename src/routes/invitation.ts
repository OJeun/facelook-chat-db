import * as express from 'express';
import { getAllInvitations, sendInvitation, acceptInvitation, rejectInvitation } from '../controller/invitationController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get('/:id', asyncHandler(getAllInvitations));
router.post('/send', asyncHandler(sendInvitation));
router.post('/accept', asyncHandler(acceptInvitation));
router.post('/reject', asyncHandler(rejectInvitation));

export default router;