const AppError = require('../../../errors/AppError');

const ErrorsHandler = require('./ErrorsHandler');

let req;
let res;
let next;

describe('ErrorsHandler', () => {
  beforeEach(() => {
    req = {};
    res = {
      status: () => {
        const response = {
          json: message => message,
        };

        return response;
      },
    };
    next = jest.fn().mockName('next');
  });

  it('should be able to return handle AppErrors (appError)', async () => {
    const expectedResponse = {
      error: true,
      status: 404,
      message: 'Resource not found',
    };

    const err = new AppError(expectedResponse);

    const response = ErrorsHandler.appError(err, req, res, next);

    expect(response).toEqual(expectedResponse);
  });

  it('should be able to return handle Internal Server Errors (appError)', async () => {
    const err = new Error('Internal Server Error');

    const expectedResponse = {
      error: true,
      status: 500,
      message: 'Internal Server Error',
    };

    const response = ErrorsHandler.appError(err, req, res, next);

    expect(response).toEqual(expectedResponse);
  });

  it('should be able to return status code 404 - Not Found (catchNotFound)', async () => {
    const expectedResponse = {
      error: true,
      status: 404,
      message: 'Resource not found',
    };

    const response = ErrorsHandler.catchNotFound(req, res, next);

    expect(response).toEqual(expectedResponse);

    expect(next).not.toBeCalled();
  });

  it('should be able to return status code 405 - Method Not Allowed (methodNegotiation)', async () => {
    req.method = 'POST';
    req.path = '/v1/opportunities';

    const expectedResponse = {
      error: true,
      status: 405,
      message: 'Method Not Allowed',
    };

    try {
      ErrorsHandler.methodNegotiation(req, res, next);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err).toEqual(expectedResponse);
    }

    expect(next).not.toBeCalled();
  });

  it('should call next function (methodNegotiation)', async () => {
    req.method = 'PUT';
    req.path = '/v1/opportunities';

    ErrorsHandler.methodNegotiation(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  it('should be able to return status code 406 - Not Acceptable (contentNegotiation)', async () => {
    req = { headers: { accept: 'application/xml' } };

    const expectedResponse = {
      error: true,
      status: 406,
      message: 'Not Acceptable',
    };

    try {
      ErrorsHandler.contentNegotiation(req, res, next);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err).toEqual(expectedResponse);
    }

    expect(next).not.toBeCalled();
  });

  it('should call next function (contentNegotiation)', async () => {
    req = { headers: { accept: 'application/json' } };

    ErrorsHandler.contentNegotiation(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  it('should be able to return status code 415 - Unsupported Media Type (contentTypeNegotiation)', async () => {
    req = { headers: { 'content-type': 'application/xml' } };

    const expectedResponse = {
      error: true,
      status: 415,
      message: 'Unsupported Media Type',
    };

    try {
      ErrorsHandler.contentTypeNegotiation(req, res, next);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err).toEqual(expectedResponse);
    }

    expect(next).not.toBeCalled();
  });

  it('should call next function - (contentTypeNegotiation)', async () => {
    req = { headers: { 'content-type': 'application/json' } };

    ErrorsHandler.contentTypeNegotiation(req, res, next);

    expect(next).toBeCalledTimes(1);
  });
});
