const { CONFLICT_CODE } = require('./errorCodes');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = CONFLICT_CODE;
  }
}
module.exports = ConflictError;
