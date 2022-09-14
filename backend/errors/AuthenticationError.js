const { UNAUTHORIZED_CODE } = require('./errorCodes');

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = UNAUTHORIZED_CODE;
  }
}
module.exports = AuthenticationError;
