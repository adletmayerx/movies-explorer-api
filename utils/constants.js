const MODE_DEV = 'development';
const MONGO_URL = 'mongodb://localhost:27017/moviesdb';
const LOCAL_PORT = 3000;
const JWT_KEY = 'secret-key';

const CORS_ALLOWED = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://asadrtdinov.nomoredomains.rocks',
  'https://asadrtdinov.nomoredomains.rocks',
];

module.exports = {
  CORS_ALLOWED, MODE_DEV, MONGO_URL, LOCAL_PORT, JWT_KEY,
};
