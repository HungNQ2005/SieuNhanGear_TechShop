const { ERRORS } = require('../constants/errors.constants');

class HttpError extends Error {
  /**
   * @param {{code?: string, statusCode?: number, message?: string, details?: any}} params
   */
  constructor({ code, statusCode, message, details } = {}) {
    const resolvedCode = code || ERRORS.INTERNAL_SERVER_ERROR.code;
    const resolvedStatusCode = statusCode || ERRORS.INTERNAL_SERVER_ERROR.statusCode;
    const resolvedMessage = message || ERRORS.INTERNAL_SERVER_ERROR.defaultMessage;

    super(resolvedMessage);

    this.code = resolvedCode;
    this.statusCode = resolvedStatusCode;
    this.details = details;
  }
}

module.exports = { HttpError };

