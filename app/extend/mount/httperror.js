'use strict';

class HttpError extends Error {
  constructor(message, code, status) {
    super();
    this.name = 'HttpError';
    if (typeof message === 'object') {
      this.code = message.code || 1;
      this.status = status || 200;
      this.message = typeof code === 'string' ? code : message.msg;
    } else {
      this.message = message;
      this.code = code || 1;
      this.status = status || 200;
    }
    this.stack = (new Error()).stack;
  }
}

module.exports = HttpError;
