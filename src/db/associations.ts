import { User } from './models/user';
import { Friend } from './models/friend';
import { Group } from './models/group';
import { UserGroup } from './models/userGroup';
import { Chat } from './models/chat';

export default function setupAssociations(): void {
    // Find all friends for a user (where userId in Friend matches the user's ID)
    User.hasMany(Friend, { foreignKey: 'userId', as: 'friends' });

    // Find all users who have this user as a friend (where friendId in Friend matches the user's ID)
    User.hasMany(Friend, { foreignKey: 'friendId' });

    // Find all groups a user belongs to
    User.hasMany(UserGroup, { foreignKey: 'userId', as: 'groups' });

    // Find all chats associated with a specific user
    User.hasMany(Chat, { foreignKey: 'userId', as: 'chats' });

    // Find all users in a specific group
    Group.hasMany(UserGroup, { foreignKey: 'groupId', as: 'users' });

    // Find all chats associated with a specific group
    Group.hasMany(Chat, { foreignKey: 'groupId', as: 'chats' });

    // Join table relationships
    Friend.belongsTo(User, { foreignKey: 'userId' });
    UserGroup.belongsTo(User, { foreignKey: 'userId' });
    UserGroup.belongsTo(Group, { foreignKey: 'groupId' });
    Chat.belongsTo(User, { foreignKey: 'userId' });
    Chat.belongsTo(Group, { foreignKey: 'groupId' });
}
