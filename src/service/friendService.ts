import { User } from "../db/models/user";
import { Friend } from "../db/models/friend";
import { FriendResponseDto } from "../type/type";

export async function getAllFriendsByUserId(userId: number) {
  const friends = await Friend.findAll({
    attributes: ['friendId'],
    where: { userId },
    include: [{
        model: User,
        as: 'friendUser',
        attributes: ['name', 'email'],
     }],
  });

   const response = friends.reduce((acc, curr) => {
    const user = curr.get('friendUser') as User;
    const friend: FriendResponseDto = {
        friendId: Number(curr.get('friendId')),
        name: user.get('name'),
        email: user.get('email'),
    }
    acc.push(friend);
    return acc;
}, [] as FriendResponseDto[]);

    return response;
}

export async function addFriend(userId: number, friendId: number) {
    // Check if the friendship already exists
    const existingFriendship = await Friend.findOne({
        where: { userId, friendId },
    });

    if (existingFriendship) {
        return { message: 'Friendship already exists!' };
    }

    await Friend.create({ userId: userId, friendId: friendId });
    await Friend.create({ userId: friendId, friendId: userId });
    return { message: 'Friend added successfully!' };
}

export async function deleteFriend(userId: number, friendId: number) {
    const deletedUserFriendCount = await Friend.destroy({
        where: { userId: userId, friendId: friendId },
    });

    const deletedFriendUserCount = await Friend.destroy({
        where: { userId: friendId, friendId: userId },
    });

    if (deletedUserFriendCount === 0 && deletedFriendUserCount === 0) {
        return { message: 'Friend does not exist!' };
    }

    return { message: 'Friend deleted successfully!' };
}