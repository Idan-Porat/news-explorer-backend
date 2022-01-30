const ErrorHandler = require('../middlewares/errorHandler');

class NotFoundError extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }

  error() {
    return `Error status: ${this.statusCode} and the reason is: ${this.message} `;
  }
}

module.exports = NotFoundError;
