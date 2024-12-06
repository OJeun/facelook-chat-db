import { Sequelize } from "sequelize";
import config from "./config/config";
import dotenv from "dotenv";
import { initUser } from "./models/user";
import { initFriend } from "./models/friend";
import { initGroup } from "./models/group";
import { initUserGroup } from "./models/userGroup";
import { initChat } from "./models/chat";
import { initFriendRequest } from "./models/friendRequest";
import { initInvitation } from "./models/invitation";
import setupAssociations from "./associations";

dotenv.config();
let sequelize: Sequelize;

export function init(): Sequelize {
  sequelize = new Sequelize(
    process.env.DB_NAME || "default_db_name",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "password",
    {
      host: process.env.DB_HOST || "localhost",
      dialect: "mysql",
      port: Number(process.env.DB_PORT) || 3306,
      timezone: process.env.DB_TIMEZONE || "+09:00",
    }
  );

  initUser(sequelize);
  initFriend(sequelize);
  initGroup(sequelize);
  initUserGroup(sequelize);
  initChat(sequelize);
  initInvitation(sequelize);
  initFriendRequest(sequelize);

  setupAssociations();

  sequelize
    .sync()
    .then(() => {
      console.log("All models were synchronized successfully.");
    })
    .catch((err) => {
      console.error("Error syncing models:", err);
    });

  return sequelize;
}

export { sequelize };
