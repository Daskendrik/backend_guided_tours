const { Pool } = require('pg');

// Конфигурация базы данных PostgreSQL
const pooltest = new Pool({
  user: 'postgres', // Пользователь базы данных
  host: '185.246.183.199', // Хост базы данных (обычно localhost)
  database: 'test_db', // Название базы данных, которую мы создали
  password: 'qwerty$1234', // Пароль пользователя postgres
  port: 5432, // Порт PostgreSQL (по умолчанию 5432)
});

// Простой запрос к базе данных для проверки
// pool.query('SELECT NOW()', (err, result) => {
//   if (err) {
//     console.error('Ошибка выполнения запроса:', err);
//   } else {
//     console.log('Результат запроса:', result.rows[0]);
//   }
// });

module.exports = pooltest;
