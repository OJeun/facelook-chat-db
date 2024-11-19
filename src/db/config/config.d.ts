import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define the configuration object with proper TypeScript types
const config = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'default_db_name',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql' as Dialect,
  };

export default config;
