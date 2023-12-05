const { Pool } = require('pg');
require('dotenv').config();

// Конфигурация базы данных PostgreSQL
const pool = new Pool({
  user: process.env.BD_USER, // Пользователь базы данных
  host: process.env.BD_HOST, // Хост базы данных (обычно localhost)
  database: process.env.DB, // Название базы данных, которую мы создали
  password: process.env.BD_PAS, // Пароль пользователя postgres
  port: process.env.DB_PORT, // Порт PostgreSQL (по умолчанию 5432)
});

module.exports = pool;
