const jwt = require('jsonwebtoken'); // importing the jsonwebtoken module
const bcrypt = require('bcryptjs'); // importing bcrypt
const User = require('../models/user');
const UserExistsError = require('../errors/userExistsError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const STAT_CODE_200 = 200;
const ERR_CODE_409 = 409;

module.exports.getAllUsers = (req, res, next) => User.find({})
  .then((user) => {
    if (!user) {
      throw new UserExistsError('No users found');
    }
    res.status(STAT_CODE_200).send({ user });
  })
  .catch(next);

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  return User.findOne({ id: _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user with matching ID found');
      }
      res.status(STAT_CODE_200).send({ user });
    })
    .catch(next);
};

module.exports.register = (req, res) => {
  const { password, name } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email: req.body.email, password: hash, name }))
    .then((data) => {
      res.status(STAT_CODE_200).send({
        email: data.email,
        name: data.name,
        _id: data._id,
      });
    })
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Bad request error');
      }
      res.status(STAT_CODE_200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate email
        res.status(ERR_CODE_409).send({ success: false, message: 'User already exist!' });
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Authorization Error');
      }
      // we're creating a token
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'prodaction' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // we return the token
      res.send({ token });
    })
    .catch(next);
};
