const { ERRORS } = require('../constants/errors.constants');

function notFoundMiddleware(req, res) {
  res.status(ERRORS.NOT_FOUND.statusCode).json({
    code: ERRORS.NOT_FOUND.code,
    message: ERRORS.NOT_FOUND.defaultMessage,
  });
}

module.exports = { notFoundMiddleware };


