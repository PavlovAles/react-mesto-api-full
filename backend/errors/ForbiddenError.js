const { FORBIDDEN_CODE } = require('./errorCodes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN_CODE;
  }
}
module.exports = ForbiddenError;
