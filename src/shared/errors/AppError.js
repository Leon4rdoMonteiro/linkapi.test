class AppError {
  error = true
  status
  message

  constructor({ status, message }) {
    this.error = this.error;
    this.status = status;
    this.message = message;
  }
}

module.exports = AppError;
