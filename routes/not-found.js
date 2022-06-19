const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
