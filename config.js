require('dotenv').config();

const {
  JWT_KEY, MONGO_URL, MODE_DEV, LOCAL_PORT,
} = require('./utils/constants');

const {
  NODE_ENV = MODE_DEV,
  MONGO_DB = MONGO_URL,
  PORT = LOCAL_PORT,
  JWT_CODE = JWT_KEY,
} = process.env;

module.exports = {
  NODE_ENV,
  MONGO_DB,
  PORT,
  JWT_CODE,
};
