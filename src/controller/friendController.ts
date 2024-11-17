import { Request, Response } from 'express';
import { getAllFriendsByUserId, deleteFriend as deleteFriendService, addFriend as addFriendService } from '../service/friendService';

export async function getAllFriends(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const friends = await getAllFriendsByUserId(userId);
  return res.json({ friends });
}

export async function addFriend(req: Request, res: Response) {
    const userId = parseInt(req.body.userId);
    const friendId = parseInt(req.body.friendId);
    const result = await addFriendService(userId, friendId);
    return res.json(result);
}

export async function deleteFriend(req: Request, res: Response) {
    const userId = parseInt(req.body.userId);
    const friendId = parseInt(req.body.friendId);
    const result = await deleteFriendService(userId, friendId);
    return res.json(result);
}
