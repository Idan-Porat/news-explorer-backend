const { ErrorHandler } = require('../middlewares/errorHandler');

class MongoError extends ErrorHandler {
}

module.exports = MongoError;
