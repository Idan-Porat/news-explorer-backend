const { ErrorHandler } = require('../middlewares/errorHandler');

class UnauthorizedError extends ErrorHandler {
}

module.exports = UnauthorizedError;
