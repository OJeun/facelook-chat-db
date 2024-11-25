import { Request, Response } from 'express';
import { 
    getAllChatsByGroupId as getAllChatsByGroupIdService,
    get20ChatsByOffset as get20ChatsByGroupIdService,
    saveChatMessages as saveChatMessagesService,
    createSingleChat as createSingleChatService

} from '../service/chatService';

export async function getAllChatsByGroupId(req: Request, res: Response) {
    const groupId = parseInt(req.params.id);
    const chats = await getAllChatsByGroupIdService(groupId);

    return res.json({ chats });
}

export async function get20ChatsByGroupId(req: Request, res: Response) {
    const groupId = parseInt(req.params.id);
    const offset = parseInt(req.query.offset as string);
    const limit = parseInt(req.query.limit as string);
    const chats = await get20ChatsByGroupIdService(groupId, offset, limit);

    return res.json({ chats });
}

export async function saveChatMessages(req: Request, res: Response) {
    const chatList = req.body.chatList;
    const chat = await saveChatMessagesService(chatList);

    return res.json({ chat });
}

export async function createSingleChat(req: Request, res: Response) {
    const chat = req.body.chat;
    const newChat = await createSingleChatService(chat);
    
    return res.json({ newChat });
}
