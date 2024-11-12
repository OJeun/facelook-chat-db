import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

interface DBConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host?: string;
    port?: number;
    dialect: Dialect;
    use_env_variable?: string; 
    timezone?: string;
  };
}

const config: DBConfig = {
  development: {
    use_env_variable: process.env.DB_CONNECTION_STRING, 
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database_name',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
    timezone: process.env.DB_TIMEZONE || '+09:00',
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database_name',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
    timezone: process.env.DB_TIMEZONE || '+09:00',
  },
  production: {
    use_env_variable: process.env.DB_CONNECTION_STRING,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database_name',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
    timezone: process.env.DB_TIMEZONE || '+09:00',
  },
};

export default config;
