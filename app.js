const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { limiter } = require('./configuration/limiter');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');
const { register, login } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/errorHandler');
const constants = require('./configuration/constants');

const { PORT = constants.PORT_NUMBER } = process.env;
const app = express();

app.use(limiter);
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(constants.MONGO_ADDRESS);

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().required().min(2),
  }),
}), register);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

app.use('/', auth, userRouter);

app.use('/', auth, articleRouter);

app.use(errorLogger); // enabling the error logger
app.use(errors());

app.use((err, req, res, next) => {
  handleError(err, res);
  next();
});

app.listen(PORT, () => {
  console.log(`Link to the server ${PORT}`);
});
