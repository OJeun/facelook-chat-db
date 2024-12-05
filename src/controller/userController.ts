import { Request, Response } from 'express';
import { getUserDatabyUserId, getAllAchievementPointsDesc, getAllUsersWithAchievementPoints } from '../service/userService';

export async function getUserData(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const user = await getUserDatabyUserId(userId);
    return res.json({ user });
}

export async function getAllUsers(req: Request, res: Response) {
      try {
        const users = await getAllUsersWithAchievementPoints();
        return res.json({ users });
      } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Failed to fetch users' });
      }
}

export async function getAllAchievementPoints(req: Request, res: Response) {
    const achievementPoints = await getAllAchievementPointsDesc();
    return res.json({ achievementPoints });
}