import { Sequelize } from 'sequelize';
import config from './config/config';
import dotenv from 'dotenv';
import { initUser } from './models/user';
import { initFriend } from './models/friend';
import { initGroup } from './models/group';
import { initUserGroup } from './models/userGroup';
import { initChat } from './models/chat';
import { initInvitation } from './models/invitation';
import setupAssociations from './associations';

dotenv.config();

export function init(): Sequelize {
  const envConfig = process.env.NODE_ENV === 'production' ? config.production : config.development;

  const sequelize = new Sequelize(
    envConfig.database,
    envConfig.username,
    envConfig.password,
    {
      host: envConfig.host,
      dialect: envConfig.dialect,
      port: envConfig.port,
      timezone: envConfig.timezone,
    }
  );

  initUser(sequelize);
  initFriend(sequelize);
  initGroup(sequelize);
  initUserGroup(sequelize);
  initChat(sequelize);
  initInvitation(sequelize);

  setupAssociations();

  return sequelize;
}
