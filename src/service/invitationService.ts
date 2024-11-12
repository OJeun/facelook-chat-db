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
        as: "sender",
        attributes: ["name"],
      },
      {
        model: Group,
        as: "group",
        attributes: ["name"],
      },
    ],
  });
  const response = invitations.reduce((acc, curr) => {
    const sender = curr.get("sender") as User;
    const group = curr.get("group") as Group;
    const invitation: InvitationResponseDto = {
      invitationId: Number(curr.get("invitationId")),
      senderName: sender.get("name"),
      groupName: group.get("name") as string,
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
  const invitation = await Invitation.findByPk(invitationId);
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
