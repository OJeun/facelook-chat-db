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
  await Friend.create({ userId, friendId });
}

export async function deleteFriend(userId: number, friendId: number) {
    await Friend.destroy({
        where: { userId, friendId },
    });
    }
