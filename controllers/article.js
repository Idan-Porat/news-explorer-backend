const Article = require('../models/article');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');

const STAT_CODE_200 = 200;

module.exports.getArticles = (req, res, next) => Article.find({})
  .then((article) => {
    if (!article) {
      throw new NotFoundError('No article found');
    }
    res.status(STAT_CODE_200).send(article);
  })
  .catch(next);

module.exports.createArticle = (req, res, next) => {
  const { _id } = req.user;
  const {
    keyword, title, text, link, image, source,
  } = req.body;
  return Article.create({
    keyword, title, link, text, image, source, owner: _id,
  })
    .then((data) => {
      res.send({
        keyword: data.keyword,
        title: data.title,
        text: data.text,
        date: data.data,
        source: data.source,
        link: data.link,
        image: data.image,
        owner: data.owner,
        _id: data._id,
      });
    })
    .then((article) => {
      if (!article) {
        throw new BadRequestError('Unsuccessful Request');
      }
      res.send({ article });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  return Article.findByIdAndRemove(articleId)
    .then((article) => {
      if (!article) {
        throw new UnauthorizedError('No article found by this id');
      }
      res.status(STAT_CODE_200).send(article);
    })
    .catch(next);
};
