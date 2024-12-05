import * as express from 'express';
import {
  getAllFriends,
  addFriend,
  deleteFriend,
} from '../controller/friendController';
import {
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from '../controller/friendRequestController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get('/:id', asyncHandler(getAllFriends));
router.post('/add', asyncHandler(addFriend));
router.post('/delete', asyncHandler(deleteFriend));

router.get('/request/:receiverId', asyncHandler(getFriendRequests));
router.post('/request/send', asyncHandler(sendFriendRequest));
router.post('/request/accept', asyncHandler(acceptFriendRequest));
router.post('/request/reject', asyncHandler(rejectFriendRequest));

export default router;