const userRouter = require('express').Router();
const { updateUser, getUserInfo } = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/validation');

userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', userInfoValidation, updateUser);

module.exports = userRouter;
