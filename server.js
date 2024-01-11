const express = require('express');
const path = require('path');

const busesRoutes = require('./routes/buses');
const companyBus = require('./routes/company_bus');
const typeLov = require('./routes/type_lov');
const contact = require('./routes/contact');
// создаем объект приложения
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/build')); //добавлено, чтобы приложение понимало в какой директиве работает
//адреса в индексе должны быть /static/css/main.a31be556.css

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

//localhost:3000/api/
app.use('/api/buses', busesRoutes);
app.use('/api/company_bus', companyBus);
app.use('/api/type_lov', typeLov);
app.use('/api/contact', contact);

const PORT = process.env.PORT || 3001;
// определяем обработчик для маршрута "/"
// app.get('*', function (req, res) {
//   // отправляем ответ
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });
// начинаем прослушивать подключения на 3000 порту
app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Server start, port ${PORT}...`);
}); //запускаем сервеh
