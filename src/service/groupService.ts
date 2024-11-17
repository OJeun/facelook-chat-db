import { Group } from "../db/models/group";
import { UserGroup } from "../db/models/userGroup";
import { Chat } from "../db/models/chat";

// Return all group names that the user is in
export async function getGroupListByUserId(userId: number) {
  const userGroups = await UserGroup.findAll({
    where: { userId },
    include: [
      {
        model: Group,
        as: "group",
        attributes: ["groupId", "groupName"],
      },
    ],
  });
  const response = userGroups.reduce((acc, curr) => {
    const group = curr.get("group") as Group;
    const groupId = group.get("groupId");
    const groupName = group.get("groupName");
    const groupInfo = { groupId, groupName };
    acc.push(groupInfo);
    return acc;
  }, [] as { groupId: number; groupName: string }[]);
  return response;
}

// Return the last message of the group from chat table
export async function getLastMessageByGroupId(groupId: number) {
  const group = await Group.findByPk(groupId, {
    include: [
      {
        model: Chat,
        as: "groupMessages", 
        attributes: ["message"],
      },
    ],
  });
  if (!group) {
    throw new Error("Group not found");
  }

  const chats = group.get("groupMessages") as Chat[];
  if (chats.length === 0) {
    throw new Error("No messages found in this group");
  }

  const lastChat = chats[chats.length - 1];
  return lastChat.get("message") as string;
}


export async function createGroup(name: string, creatorId: number) {
  console.log("Name in createGroup", name);
  const group = await Group.create({ groupName: name, userId: creatorId });
  // Add the user to UserGroup table
  await UserGroup.create({ userId: creatorId, groupId: group.groupId });
  return group;
}
