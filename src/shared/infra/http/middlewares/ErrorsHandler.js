const AppError = require('../../../errors/AppError');

module.exports = {
  catchNotFound(req, res, next) {
    return res.status(404).json({
      error: true,
      status: 404,
      message: 'Resource not found',
    });
  },

  methodNotAllowed(req, res, next) {
    const allowed = ['PUT', 'GET', 'OPTIONS', 'HEAD'];
    const path = '/v1/opportunities';

    if (!allowed.includes(req.method) && req.path === path) {
      throw new AppError({
        status: 405,
        message: 'Method Not Allowed',
      });
    }

    next();
  },

  notAcceptable(req, res, next) {
    const allowed = ['application/json', '*/*'];

    if (!allowed.includes(req.headers.accept)) {
      throw new AppError({
        status: 406,
        message: 'Not Acceptable',
      });
    }

    next();
  },

  unsupportedMediaType(req, res, next) {
    const allowed = ['application/json', '*/*'];
    const contentType = req.headers['content-type'];

    if (contentType && !allowed.includes(contentType)) {
      throw new AppError({
        status: 415,
        message: 'Unsupported Media Type',
      });
    }

    next();
  },

  appError(err, req, res, _) {
    if (err instanceof AppError) {
      const { error, status, message } = err;

      return res.status(status).json({
        error,
        status,
        message,
      });
    }

    console.error(err);

    return res.status(500).json({
      error: true,
      status: 500,
      message: 'Internal Server Error',
    });
  },
};
