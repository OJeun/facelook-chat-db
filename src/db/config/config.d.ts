import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define the configuration object with proper TypeScript types
const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'default_db_name',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql' as Dialect,
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME_TEST || 'test_database',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql' as Dialect,
  },
  production: {
    use_env_variable: process.env.DATABASE_URL || '', // Use environment variable for production
    dialect: 'mysql' as Dialect,
  },
};

export default config;
