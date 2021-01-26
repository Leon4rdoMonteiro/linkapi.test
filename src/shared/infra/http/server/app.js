require('dotenv/config');
require('reflect-metadata');
require('express-async-errors');

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const expressRateLimit = require('express-rate-limit');

const { MONGO_HOST } = process.env;

const mongoConfig = require('../../../../config/mongo');
const rateLimiterConfig = require('../../../../config/rateLimiter');

const ErrorHandler = require('../middlewares/ErrorsHandler');

const routes = require('../routes');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.mongo();
    this.contentNegotiation();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(expressRateLimit(rateLimiterConfig));
  }

  routes() {
    this.server.use('/v1', routes);
  }

  async mongo() {
    await mongoose.connect(MONGO_HOST, mongoConfig).catch(err => {
      throw err;
    });
  }

  contentNegotiation() {
    this.server.use(ErrorHandler.notAcceptable);
    this.server.use(ErrorHandler.unsupportedMediaType);
  }

  errorHandler() {
    this.server.use(ErrorHandler.methodNotAllowed);
    this.server.use(ErrorHandler.catchNotFound);
    this.server.use(ErrorHandler.appError);
  }
}

module.exports = new App().server;
