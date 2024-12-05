import { User } from "../db/models/user";
import { UserDataResponseDto } from "../type/type";

export async function getUserDatabyUserId(userId: number) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const userData: UserDataResponseDto = {
    userId: user.userId,
    name: user.name,
    email: user.email,
    achievementPoint: user.achievementPoint,
  };
  return userData;
}

export async function getAllAchievementPointsDesc() {
  const users = await User.findAll({
    attributes: ["userId", "email", "name", "achievementPoint"], // Select only necessary columns
    order: [["achievementPoint", "DESC"]], // Order by achievementPoint in descending order
  });
  return users;
}
