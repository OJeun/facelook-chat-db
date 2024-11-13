import { Op } from "sequelize";
import { Chat } from "../db/models/chat";

// Retrieve all chats from Chat table by groupId and by descending order of createdAt
export async function getAllChatsByGroupId(groupId: number) {
  const chats = await Chat.findAll({
    where: { groupId },
    order: [['createdAt', 'DESC']],
  });
  return chats;
}

// lastMessage should be passed by the client side. If it is null, it will return the latest 20 chats
// This is a different way of pagination. Instead of passing page number, we pass the last message date
export async function get20ChatsByGroupId(groupId: number, lastMessageDate?: Date) {
    const limit = 20;
  
    const chats = await Chat.findAll({
      where: {
        groupId,
        ...(lastMessageDate && { createdAt: { [Op.lt]: lastMessageDate } }), // lastMessageDate가 있을 때만 적용
      },
      order: [['createdAt', 'DESC']], 
      limit,
    });
  
    return chats;
  }
  

// Save several chat messages sent in a group chat,
// each message is Chat type, so parameter will be an array of Chat
export async function saveChatMessages(chatList: Partial<Chat>[]) {
  const chat = await Chat.bulkCreate(chatList.map(chat => ({
    groupId: chat.groupId,
    senderId: chat.senderId,
    message: chat.message,
    createdAt: chat.createdAt
  })));
  return chat;
}

