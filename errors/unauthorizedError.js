const Error = require('../middlewares/errorHandler');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }

  error() {
    return `Error status: ${this.statusCode} and the reason is: ${this.message} `;
  }
}

module.exports = UnauthorizedError;
