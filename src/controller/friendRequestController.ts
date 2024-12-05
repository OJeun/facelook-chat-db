import { Request, Response } from 'express';
import {
  sendFriendRequest as sendFriendRequestService,
  acceptFriendRequest as acceptFriendRequestService,
  rejectFriendRequest as rejectFriendRequestService,
  getAllFriendRequestsByReceiverId as getFriendRequestService
} from '../service/friendRequestService';

export async function getFriendRequests(req: Request, res: Response) {
  const receiverId = parseInt(req.params.receiverId);

  try {
    const result = await getFriendRequestService(receiverId);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function sendFriendRequest(req: Request, res: Response) {
  const senderId = parseInt(req.body.senderId);
  const receiverEmail = req.body.receiverEmail;

  const result = await sendFriendRequestService(senderId, receiverEmail);
  return res.json(result);
}

export async function acceptFriendRequest(req: Request, res: Response) {
  const requestId = parseInt(req.body.requestId);

  const result = await acceptFriendRequestService(requestId);
  return res.json(result);
}

export async function rejectFriendRequest(req: Request, res: Response) {
  const requestId = parseInt(req.body.requestId);

  const result = await rejectFriendRequestService(requestId);
  return res.json(result);
}