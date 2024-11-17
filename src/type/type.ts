export interface FriendResponseDto {
    friendId: number,
    name: string,
    email: string,
}

export interface InvitationResponseDto {
    invitationId: number,
    senderId: number,
    senderName: string,
    groupName: string,
}

export interface UserDataResponseDto {
    userId: number,
    name: string,
    email: string,
    acheivementPoint: number,
}