const express = require('express');
const path = require('path');
const corc = require('cors');

const busesRoutes = require('./routes/buses');
// создаем объект приложения
const app = express();
app.use(express.static(__dirname + '/build')); //добавлено, чтобы приложение понимало в какой директиве работает
//адреса в индексе должны быть /static/css/main.a31be556.css

//Обработка запросов с вью всех ТС
app.use('/api/buses', busesRoutes); //localhost:3000/api/buses/ :getAllbus
app.use(corc());

const PORT = process.env.PORT || 5000;
// определяем обработчик для маршрута "/"
app.get('*', function (req, res) {
  // отправляем ответ
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
// начинаем прослушивать подключения на 3000 порту
app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Server start, port ${PORT}...`);
}); //запускаем сервеh
