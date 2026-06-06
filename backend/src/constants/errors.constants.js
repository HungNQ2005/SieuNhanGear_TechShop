const ERRORS = {
  NOT_FOUND: {
    code: 'NOT_FOUND',
    statusCode: 404,
    defaultMessage: 'Not Found',
  },

  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    statusCode: 500,
    defaultMessage: 'Internal Server Error',
  },
};

module.exports = { ERRORS };

