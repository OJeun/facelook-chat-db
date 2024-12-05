import { User } from '../db/models/user';
import { addFriend } from '../service/friendService';
import { FriendRequest } from '../db/models/friendRequest';

export async function sendFriendRequest(
  senderId: number,
  receiverEmail: string
) {
  const receiver = await User.findOne({
    where: { email: receiverEmail },
  });

  if (!receiver) {
    return { status: 'error', message: 'Receiver email not found!' };
  }

  const receiverId = receiver.userId;

  // check if there is an existing request
  const existingRequest = await FriendRequest.findOne({
    where: {
      senderId,
      receiverId,
      status: ['pending', 'accepted', 'rejected'],
    },
  });

  if (existingRequest) {
    if (existingRequest.status === 'pending') {
      return { message: 'Friend request already sent!' };
    } else if (existingRequest.status === 'accepted') {
      return { message: 'You two are already friends!' };
    } else if (existingRequest.status === 'rejected') {
      await FriendRequest.create({ senderId, receiverId });
      return { message: 'Friend request sent successfully!' };
    }
  }

  // create new friend request
  await FriendRequest.create({ senderId, receiverId });
  return { message: 'Friend request sent successfully!' };
}

export async function acceptFriendRequest(requestId: number) {
  const request = await FriendRequest.findByPk(requestId);

  if (!request || request.status !== 'pending') {
    throw new Error('Invalid or already processed request');
  }

  await request.update({ status: 'accepted' });

  const { senderId, receiverId } = request;
  const result = await addFriend(senderId, receiverId);

  return { message: 'Friend request accepted!' };
}

export async function rejectFriendRequest(requestId: number) {
  const request = await FriendRequest.findByPk(requestId);

  if (!request || request.status !== 'pending') {
    throw new Error('Invalid or already processed request');
  }

  await request.update({ status: 'rejected' });

  return { message: 'Friend request rejected!' };
}

export async function getAllFriendRequestsByReceiverId(receiverId: number) {
  const requests = await FriendRequest.findAll({
    where: { receiverId, status: 'pending' },
    include: [
      {
        model: User,
        as: 'sender',
        attributes: ['name', 'email'],
      },
    ],
  });

  if (!requests.length) {
    return { friends: [] };
  }

  const response = requests.map((request) => {
    const sender = request.get('sender') as User;
    return {
      requestId: request.get('requestId'),
      senderId: request.get('senderId'),
      senderName: sender?.name,
      senderEmail: sender?.email,
      status: request.get('status'),
    };
  });

  return { friends: response };
}
