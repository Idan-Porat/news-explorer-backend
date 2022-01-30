const articleRouter = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { validateURL } = require('../middlewares/linkValidation');
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/article');

articleRouter.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
    source: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    link: Joi.string().required().custom(validateURL),
  }).unknown(true),
}), createArticle);
articleRouter.get('/articles', getArticles);
articleRouter.delete('/articles/:articleId', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().hex().required(),
    }).unknown(true),
  }).unknown(true),
  params: Joi.object()
    .keys({
      articleId: Joi.string().hex().required(),
    }).unknown(true),
}), deleteArticle);

module.exports = articleRouter;
