const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CORS_ALLOWED } = require('./utils/constants');
const { MONGO_DB, PORT } = require('./config');

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

require('dotenv').config();

app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (CORS_ALLOWED.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);

app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(limiter);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
mongoose.connect(MONGO_DB, {});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(PORT);
});
