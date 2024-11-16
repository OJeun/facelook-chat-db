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
        attributes: ["name"],
      },
    ],
  });
  const response = userGroups.reduce((acc, curr) => {
    const group = curr.get("group") as Group;
    acc.push(group.get("name") as string);
    return acc;
  }, [] as string[]);
  return response;
}

// Return the last message of the group from chat table
export async function getLastMessageByGroupId(groupId: number) {
  const group = await Group.findByPk(groupId, {
    include: [
      {
        model: Chat,
        as: "lastChat",
        attributes: ["message"],
      },
    ],
  });
  if (!group) {
    throw new Error("Group not found");
  }
  const chat = group.get("lastChat") as Chat;
  return chat.get("message") as string;
}

export async function createGroup(name: string) {
  console.log("Name in createGroup", name);
  const group = await Group.create({ groupName: name });
  return group;
}
