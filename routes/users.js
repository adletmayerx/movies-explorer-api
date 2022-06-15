const userRouter = require('express').Router();
const { updateUser, getUserInfo } = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/validation');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', userInfoValidation, updateUser);

module.exports = userRouter;
