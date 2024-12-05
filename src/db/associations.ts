import { User } from "./models/user";
import { Friend } from "./models/friend";
import { Group } from "./models/group";
import { UserGroup } from "./models/userGroup";
import { Chat } from "./models/chat";
import { Invitation } from "./models/invitation";
import { FriendRequest } from "./models/friendRequest";

export default function setupAssociations(): void {
  // Find all friends for a user (where userId in Friend matches the user's ID)
  User.hasMany(Friend, { foreignKey: "userId", as: "friends" });
  User.hasMany(Friend, { foreignKey: "friendId" });
  User.hasMany(UserGroup, { foreignKey: "userId", as: "userGroups" });
  User.hasMany(Chat, { foreignKey: "userId", as: "chats" });

  Group.hasMany(UserGroup, { foreignKey: "groupId", as: "groups" });
  Group.hasMany(Chat, { foreignKey: "groupId", as: "groupMessages" });

  // Invitation relationships. A user can receive many invitations
  User.hasMany(Invitation, {
    foreignKey: "receiverId",
    as: "receivedInvitations",
  });

  // A user can send many invitations
  User.hasMany(Invitation, { foreignKey: "senderId", as: "sentInvitations" });
  // A group can have many invitations
  Group.hasMany(Invitation, { foreignKey: "groupId", as: "groupInvitations" });
  Chat.hasOne(Group, { foreignKey: "lastChatId", as: 'groupWithLastMessage', });

  // Join table relationships
  Friend.belongsTo(User, { foreignKey: 'friendId', as: 'friendUser' });
  UserGroup.belongsTo(User, { foreignKey: "userId" });
  UserGroup.belongsTo(Group, { foreignKey: "groupId", as: "group" });
  Chat.belongsTo(User, { foreignKey: "userId" });
  Chat.belongsTo(Group, { foreignKey: "groupId", as: "groupChat" });
  FriendRequest.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

  // Define inverse relationships for Invitation
  Invitation.belongsTo(User, { foreignKey: "receiverId", as: "invitee" });
  Invitation.belongsTo(User, { foreignKey: "senderId", as: "invitor" });
  Invitation.belongsTo(Group, { foreignKey: "groupId", as: "invitedGroup" });
}
