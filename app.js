require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const router = require('./routers');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_ADRESS } = require('./utils/const');

const { PORT = 3001 } = process.env;
const { DB_ADDRESS = MONGO_ADRESS } = process.env;

const allowedCors = [
  '*',
  // 'http://localhost:3001',
  // 'https://movies.sergeist.nomoredomains.rocks',
  // 'http://movies.sergeist.nomoredomains.rocks',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const app = express();

mongoose.set('strictQuery', false);

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use((req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
