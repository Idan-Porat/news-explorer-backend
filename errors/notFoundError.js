const { ErrorHandler } = require('../middlewares/errorHandler');

class NotFoundError extends ErrorHandler {
}

module.exports = NotFoundError;
