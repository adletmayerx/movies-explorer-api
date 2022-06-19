const { celebrate, CelebrateError, Joi } = require('celebrate');
const { isURL, isEmail } = require('validator');

module.exports.userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string()
      .required()
      .custom((value) => {
        if (!isEmail(value)) {
          throw new CelebrateError('Введен некоректный email');
        }
        return value;
      }),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value) => {
        if (!isEmail(value)) {
          throw new CelebrateError('Введен некоректный email');
        }
        return value;
      }),
    password: Joi.string().required(),
  }),
});

module.exports.userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string()
      .required()
      .custom((value) => {
        if (!isEmail(value)) {
          throw new CelebrateError('Введен некоректный email');
        }
        return value;
      }),
    password: Joi.string().required(),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports.movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .custom((value) => {
        if (!isURL(value)) {
          throw new CelebrateError('Введен некоректный url');
        }
        return value;
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value) => {
        if (!isURL(value)) {
          throw new CelebrateError('Введен некоректный url');
        }
        return value;
      }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string()
      .required()
      .custom((value) => {
        if (!isURL(value)) {
          throw new CelebrateError('Введен некоректный url');
        }
        return value;
      }),
    movieId: Joi.number().integer().positive().required(),
  }),
});
