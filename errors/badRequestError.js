const Error = require('../middlewares/errorHandler');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }

  error() {
    return `Error status: ${this.statusCode} and the reason is: ${this.message} `;
  }
}

module.exports = BadRequestError;
