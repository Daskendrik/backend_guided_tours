const { Pool } = require('pg');
require('dotenv').config();

// Конфигурация базы данных PostgreSQL
const pool = new Pool({
  user: process.env.TEST_USER, // Пользователь базы данных
  host: process.env.HOST, // Хост базы данных (обычно localhost)
  database: process.env.TEST_DB, // Название базы данных, которую мы создали
  password: process.env.TEST_PAS, // Пароль пользователя postgres
  port: process.env.PORT, // Порт PostgreSQL (по умолчанию 5432)
});

module.exports = pool;
