const router = require('express').Router();

const { userValidation, loginValidation } = require('../middlewares/validation');
const { createUser, login, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const notFoundRouter = require('./not-found');

router.post('/signup', userValidation, createUser);
router.post('/signin', loginValidation, login);
router.delete('/signout', signOut);

router.use(auth);

router.use(
  usersRouter,
  moviesRouter,
  notFoundRouter,
);

module.exports = router;
