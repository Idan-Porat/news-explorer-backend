const Error = require('../middlewares/errorHandler');

class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }

  error() {
    return `Error status: ${this.statusCode} and the reason is: ${this.message} `;
  }
}

module.exports = UserExistsError;
