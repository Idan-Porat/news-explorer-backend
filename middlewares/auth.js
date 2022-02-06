const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

dotenv.config();

const handleAuthError = (res) => {
  res.send(new UnauthorizedError('Authorization Error'));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  console.log(token);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    handleAuthError();
  }

  req.user = payload; // adding the payload to the Request object

  next(); // passing the request further along
};
