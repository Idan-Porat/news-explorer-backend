const Error = require('../middlewares/errorHandler');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }

  error() {
    return `Error status: ${this.statusCode} and the reason is: ${this.message} `;
  }
}

module.exports = ServerError;
