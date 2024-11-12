import { Sequelize } from 'sequelize';
import config from './config/config';
import dotenv from 'dotenv';
import { initUser } from './models/user';
import { initFriend } from './models/friend';
import { initGroup } from './models/group';
import { initUserGroup } from './models/userGroup';
import { initChat } from './models/chat';
import setupAssociations from './associations';

dotenv.config();

export function init(): Sequelize {
  const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: config.development.dialect,
      port: config.development.port,
      timezone: config.development.timezone,
    }
  );

  initUser(sequelize);
  initFriend(sequelize);
  initGroup(sequelize);
  initUserGroup(sequelize);
  initChat(sequelize);

  setupAssociations();

  return sequelize;
}
