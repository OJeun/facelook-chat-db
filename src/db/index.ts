import { Sequelize } from 'sequelize';
import config from './config/config';
import dotenv from 'dotenv';
import { initUser } from '../models/user';
import { initFriend } from './models/Friend';
import { initRoom } from './models/Room';
import { initParticipant } from './models/userGroup';
import { initChatting } from './models/Chatting';
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
  initRoom(sequelize);
  initParticipant(sequelize);
  initChatting(sequelize);

  setupAssociations();

  return sequelize;
}
