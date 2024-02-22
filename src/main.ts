import express, { json } from 'express';
import path from 'path';
import cors from 'cors';

import { busesRoutes } from './routes/buses.js';
import { companyBus } from './routes/company_bus.js';
import { typeLov } from './routes/type_lov.js';
import { contact } from './routes/contact.js';
// создаем объект приложения
const app = express();
app.use(json());
//app.use(static(__dirname + '/build')); //добавлено, чтобы приложение понимало в какой директиве работает
//адреса в индексе должны быть /static/css/main.a31be556.css
// app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

//localhost:3001/api/
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
