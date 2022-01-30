const userRouter = require('express').Router();

const {
  getAllUsers, getCurrentUser,
} = require('../controllers/user');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/me', getCurrentUser);

module.exports = userRouter;
