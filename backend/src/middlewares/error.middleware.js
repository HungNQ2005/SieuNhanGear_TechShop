const { ERRORS } = require('../constants/errors.constants');

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error('[backend] error:', err);

  const statusCode = err?.statusCode || ERRORS.INTERNAL_SERVER_ERROR.statusCode;
  const code = err?.code || ERRORS.INTERNAL_SERVER_ERROR.code;
  const message = err?.message || ERRORS.INTERNAL_SERVER_ERROR.defaultMessage;

  res.status(statusCode).json({ code, message });
}

module.exports = { errorMiddleware };


