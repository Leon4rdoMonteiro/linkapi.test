class AppError {
  error = true
  statusCode
  message

  constructor({ statusCode, message }) {
    this.error = this.error;
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = AppError