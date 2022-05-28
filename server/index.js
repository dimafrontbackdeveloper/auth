require('dotenv').config(); // запускаем .env файл
// подключаем библиотеки
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router');
const mongoose = require('mongoose');

const app = express(); // наше app-сервер
app.use(express.json()); // чтобы сервер мог принимать post запросы
app.use(
  cors({
    credentials: true, // разрешаем обмениваться куками
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
  }),
); // межсетивые запросы. В свойстве origin указываем с каким адресом будем обмениваться информацией
app.use(cookieParser()); // чтобы сервер мог принимать куки
app.use('/api', router); // если маршрут будет '/api' то выполниться наш роутер

// функция для запуска сервера
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.SERVER_PORT, () =>
      console.log(`сервер запустился на порте ${process.env.SERVER_PORT}`),
    ); // подключаемся к БД;
  } catch (e) {
    throw new Error(e);
  }
};
start(); // запускаем сервер
