const jwt = require('jsonwebtoken'); // importing the jsonwebtoken module
const bcrypt = require('bcryptjs'); // importing bcrypt
const User = require('../models/user');
const UserExistsError = require('../errors/userExistsError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const MongoError = require('../errors/mongoError');
const constants = require('../configuration/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getAllUsers = (req, res, next) => User.find({})
  .then((user) => {
    if (!user) {
      throw new UserExistsError(constants.ERR_CODE_401, constants.ERR_CODE_401);
    }
    res.status(constants.STAT_CODE_200).send({ user });
  })
  .catch(next);

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  return User.findOne({ id: _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(constants.ERR_CODE_404, constants.ERR_CODE_404_MESSAGE);
      }
      res.status(constants.STAT_CODE_200).send({ user });
    })
    .catch(next);
};

module.exports.register = (req, res) => {
  const { password, name, email } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((data) => {
      res.status(constants.STAT_CODE_200).send({
        email: data.email,
        name: data.name,
        _id: data._id,
      });
    })
    .then((user) => {
      if (!user) {
        throw new BadRequestError(constants.ERR_CODE_400, 'Bad request error');
      }
      res.status(constants.STAT_CODE_200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate email
        throw new MongoError(constants.ERR_CODE_409, constants.ERR_CODE_409_MESSAGE);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UserExistsError(constants.ERR_CODE_401, `${constants.ERR_CODE_401_MESSAGE} by this email or password`);
      }
      // we're creating a token
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'prodaction' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // we return the token
      res.send({ token });
    })
    .catch(next);
};
