import { Request, Response } from 'express';
import { getAllInvitationsByReceiverId, sendInvitation as sendInvitationService, acceptInvitation as acceptInvitationService, rejectInvitation as rejectInvitationService } from '../service/invitationService';

export async function getAllInvitations(req: Request, res: Response) {
  const receiverId = parseInt(req.params.id);
  const invitations = await getAllInvitationsByReceiverId(receiverId);
  return res.json({ invitations });
}

export async function sendInvitation(req: Request, res: Response) {
    const receiverId = parseInt(req.body.receiverId);
    const senderId = parseInt(req.body.senderId);
    const groupId = parseInt(req.body.groupId);
    await sendInvitationService(receiverId, senderId, groupId);
    return res.json({ message: 'Invitation sent successfully!' });
    }

export async function acceptInvitation(req: Request, res: Response) {
    const invitationId = parseInt(req.body.invitationId);
    await acceptInvitationService(invitationId);
    return res.json({ message: 'Invitation accepted successfully!' });
}

export async function rejectInvitation(req: Request, res: Response) {
    const invitationId = parseInt(req.body.invitationId);
    await rejectInvitationService(invitationId);
    return res.json({ message: 'Invitation rejected successfully!' });
}

