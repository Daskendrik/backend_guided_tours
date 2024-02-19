import * as pg from 'pg';
const { Pool } = pg;
require('dotenv').config();

const objection = require('objection');
Model = objection.Model;

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.BD_HOST,
    port: process.env.DB_PORT,
    user: process.env.BD_USER,
    password: process.env.BD_PAS,
    database: process.env.DB,
  },
});

Model.knex(knex);

// Конфигурация базы данных PostgreSQL
export const pool = new Pool({
  user: process.env.BD_USER, // Пользователь базы данных
  host: process.env.BD_HOST, // Хост базы данных (обычно localhost)
  database: process.env.DB, // Название базы данных, которую мы создали
  password: process.env.BD_PAS, // Пароль пользователя postgres
  port: process.env.DB_PORT, // Порт PostgreSQL (по умолчанию 5432)
});
