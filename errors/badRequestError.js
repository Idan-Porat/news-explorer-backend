const { ErrorHandler } = require('../middlewares/errorHandler');

class BadRequestError extends ErrorHandler {
}
module.exports = BadRequestError;
