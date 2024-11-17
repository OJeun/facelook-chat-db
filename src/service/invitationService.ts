import { Group } from "../db/models/group";
import { User } from "../db/models/user";
import { UserGroup } from "../db/models/userGroup";
import { Invitation } from "../db/models/invitation";
import { InvitationResponseDto } from "../type/type";

export async function getAllInvitationsByReceiverId(receiverId: number) {
  const invitations = await Invitation.findAll({
    where: { receiverId },
    include: [
      {
        model: User,
        as: "invitor",
        attributes: ["name", "userId"],
      },
      {
        model: Group,
        as: "invitedGroup",
        attributes: ["groupName", "groupId"],
      },
    ],
  });

  const response = invitations.reduce((acc, curr) => {
    const sender = curr.get("invitor") as User; 
    const group = curr.get("invitedGroup") as Group; 

    const invitation: InvitationResponseDto = {
      invitationId: Number(curr.get("invitationId")),
      senderId: Number(sender.get("userId")),
      senderName: sender.get("name") as string,
      groupName: group.get("groupName") as string, 
    };

    acc.push(invitation);
    return acc;
  }, [] as InvitationResponseDto[]);

  return response;
}


export async function sendInvitation(
  receiverId: number,
  senderId: number,
  groupId: number
) {
  await Invitation.create({ receiverId, senderId, groupId });
}

export async function acceptInvitation(invitationId: number) {
const invitation = await Invitation.findByPk(invitationId, { include: [] });

  if (!invitation) {
    throw new Error("Invitation not found");
  }
  const { receiverId, groupId } = invitation;
  await UserGroup.create({ userId: receiverId, groupId });
  await invitation.destroy();
}

export async function rejectInvitation(invitationId: number) {
  const invitation = await Invitation.findByPk(invitationId);
  if (!invitation) {
    throw new Error("Invitation not found");
  }
  await invitation.destroy();
}
