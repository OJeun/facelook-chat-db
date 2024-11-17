import { Op } from "sequelize";
import { Chat } from "../db/models/chat";
import { Group } from "../db/models/group";

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
  
export async function createSingleChat(chat: Partial<Chat>) {
  const newChat = await Chat.create({
    groupId: chat.groupId,
    senderId: chat.senderId,
    message: chat.message,
    createdAt: chat.createdAt,
  });
  return newChat;
}

// Save several chat messages sent in a group chat,
// each message is Chat type, so parameter will be an array of Chat
export async function saveChatMessages(chatList: Partial<Chat>[]) {
  const validChats = chatList.map((chat) => ({
    groupId: chat.groupId,
    senderId: chat.senderId,
    message: chat.message,
    createdAt: chat.createdAt,
  }));

  const chat = await Chat.bulkCreate(validChats);
  await saveLastMessageToGroup(chat);
  return chat;
}


export async function saveLastMessageToGroup(chatList: Chat[]) {
  console.log("ChatList", chatList);
  const lastMessage = chatList[chatList.length - 1];
  console.log("LastMessage", lastMessage);

  if (!lastMessage) {
    throw new Error("No chat messages provided");
  }

  // Find the group by groupId
  const group = await Group.findByPk(lastMessage.groupId);
  if (!group) {
    throw new Error("Group not found");
  }

  // Update the lastChatId in the group table
  group.lastChatId = lastMessage.chatId;
  console.log("Group", group);
  await group.save();
}

