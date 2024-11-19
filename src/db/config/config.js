require('dotenv').config();

module.exports = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'chatdb',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,
};
