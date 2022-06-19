const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const NotAuthError = require('../errors/NotAuthError');
const ValidationError = require('../errors/ValidationError');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user && !(user._id.toString() === req.user._id)) {
        return next(ConflictError('Пользователь с таким email уже существует'));
      }
      return User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        {
          new: true,
          runValidators: true,
        },
      )
        .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
        .then((_user) => {
          res.send(_user);
        })
        .catch((e) => {
          if (e.name === 'CastError') {
            next(new ValidationError(e.message));
          } else {
            next(e);
          }
        })
        .catch(next);
    }).catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then(() => {
        res.status(200).send({
          data: {
            name,
            email,
          },
        });
      }).catch((e) => {
        if (e.name === 'CastError') {
          throw new ValidationError(e.message);
        }
        if (e.code === 11000) {
          throw new ConflictError('Пользователь с таким email уже существует');
        }
        return next(e);
      })
      .catch(next);
  })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthError('Неправильные логин или пароль');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotAuthError('Неверный пароль');
        }

        return user;
      });
    })
    .then((user) => {
      const token = jsonwebtoken.sign(
        {
          _id: user._id,
        },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        {
          expiresIn: '7d',
        },
      );

      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
          sameSite: 'none',
          secure: true,
        })
        .send({ message: 'Логин успешный' });
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'cookies deleted' });
};
