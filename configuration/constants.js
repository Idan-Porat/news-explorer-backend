const MONGO_ADDRESS = 'mongodb://localhost:27017/textFinalProject';

const PORT_NUMBER = 3000;
const STAT_CODE_200 = 200;
const ERR_CODE_400 = 400;
const ERR_CODE_401 = 401;
const ERR_CODE_403 = 403;
const ERR_CODE_404 = 404;
const ERR_CODE_409 = 409;
const ERR_CODE_400_MESSAGE = 'Bad request error';
const ERR_CODE_401_MESSAGE = 'No informations found';
const ERR_CODE_403_MESSAGE = 'Authorization Error';
const ERR_CODE_404_MESSAGE = 'Not found matching ID';
const ERR_CODE_409_MESSAGE = 'User already exist!';

module.exports = {
  PORT_NUMBER,
  MONGO_ADDRESS,
  STAT_CODE_200,
  ERR_CODE_400,
  ERR_CODE_401,
  ERR_CODE_403,
  ERR_CODE_404,
  ERR_CODE_409,
  ERR_CODE_400_MESSAGE,
  ERR_CODE_401_MESSAGE,
  ERR_CODE_403_MESSAGE,
  ERR_CODE_404_MESSAGE,
  ERR_CODE_409_MESSAGE,
};
