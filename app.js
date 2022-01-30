const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate } = require('celebrate');
const Joi = require('joi');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');
const { register, login } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notFoundError');
const ServerError = require('./errors/serverError');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/textFinalProject');

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

app.use((req, res, next) => {
  res.status(404).send(
    new NotFoundError(`Route ${req.url} Not found.`),
  );
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send(
    new ServerError('An error occurred on the server'),
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Link to the server ${PORT}`);
});
