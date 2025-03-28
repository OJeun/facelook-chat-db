import { Request, Response } from 'express';
import { getGroupListByUserId as getGroupListByUserIdService, getLastMessageByGroupId as getLastMessageByGroupIdService
, createGroup as createGroupService
 } from '../service/groupService';

export async function getGroupListByUserId(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const groupList = await getGroupListByUserIdService(userId);
    return res.json({ groupList });
}

export async function getLastMessageByGroupId(req: Request, res: Response) {
    const groupId = parseInt(req.params.id);
    const message = await getLastMessageByGroupIdService(groupId);
    return res.json({ message });
}


export async function createGroup(req: Request, res: Response) {
    const { name, creatorId } = req.body;
    const group = await createGroupService(name, creatorId);
    return res.status(201).json({ message: 'Group created successfully', group });
}
