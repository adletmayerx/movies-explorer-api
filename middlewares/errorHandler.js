const { server } = require('../errors/constants');

module.exports = (e, req, res, next) => {
  console.log(e.statusCode);
  const statusCode = e.statusCode || server;
  const message = statusCode === server ? 'Произошла ошибка' : e.message;
  res.status(statusCode).send({ message });
  next();
};
