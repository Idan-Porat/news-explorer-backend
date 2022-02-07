const Article = require('../models/article');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');
const constants = require('../configuration/constants');

module.exports.getArticles = (req, res, next) => Article.find({})
  .then((article) => {
    if (!article) {
      throw new NotFoundError(constants.ERR_CODE_401, constants.ERR_CODE_401_MESSAGE);
    }
    res.status(constants.STAT_CODE_200).send(article);
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
        throw new BadRequestError(constants.ERR_CODE_400, constants.ERR_CODE_400_MESSAGE);
      }
      res.send({ article });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { _id } = req.user;
  const { articleId } = req.params;

  return Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw new UnauthorizedError(constants.ERR_CODE_403, constants.ERR_CODE_403_MESSAGE);
      }

      if (_id !== article.owner.valueOf()) {
        throw new UnauthorizedError(constants.ERR_CODE_403, constants.ERR_CODE_403_MESSAGE);
      }
      return Article.findByIdAndRemove(articleId)
        .then((articleToDelete) => {
          res.status(constants.STAT_CODE_200).send(articleToDelete);
        });
    })
    .catch(next);
};
