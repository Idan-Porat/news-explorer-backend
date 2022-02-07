const { ErrorHandler } = require('../middlewares/errorHandler');

class UserExistsError extends ErrorHandler {
}

module.exports = UserExistsError;
