import * as express from 'express';
import { getAllFriends, addFriend, deleteFriend } from '../controller/friendController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get('/:id', asyncHandler(getAllFriends));
router.post('/add', asyncHandler(addFriend));
router.post('/delete', asyncHandler(deleteFriend));