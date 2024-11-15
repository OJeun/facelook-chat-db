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
  console.log('process.env', process.env);
  const envConfig = process.env.NODE_ENV === 'production' ? config.production : config.development;


  console.log('envConfig is', config.development);

  const sequelize = new Sequelize(
    process.env.DB_NAME || 'default_db_name',
    process.env.DB_USER || envConfig.username,
    process.env.DB_PASSWORD || envConfig.password,
    {
      host: process.env.DB_HOST || envConfig.host,
      dialect: 'mysql',
      port: Number(process.env.DB_PORT) || envConfig.port,
      timezone: process.env.DB_TIMEZONE || envConfig.timezone,
    }
  );

  initUser(sequelize);
  initFriend(sequelize);
  initGroup(sequelize);
  initUserGroup(sequelize);
  initChat(sequelize);
  initInvitation(sequelize);

  setupAssociations();

  sequelize.sync({ force: true }) // Use `force: true` only in development
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error syncing models:", err);
  });

  return sequelize;
}


