const AppError = require('../../../errors/AppError');

module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    const { error, statusCode, message } = err;

    return res.status(statusCode).json({
      error,
      message,
    });
  }

  console.error(err);

  return res.status(500).json({
    error: true,
    message: 'Internal server error',
  });
};
