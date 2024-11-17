import { Request, Response } from 'express';
import { getUserDatabyUserId, getAllAchievementPointsDesc } from '../service/userService';

export async function getUserData(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const user = await getUserDatabyUserId(userId);
    return res.json({ user });
}

export async function getAllAchievementPoints(req: Request, res: Response) {
    const achievementPoints = await getAllAchievementPointsDesc();
    return res.json({ achievementPoints });
}