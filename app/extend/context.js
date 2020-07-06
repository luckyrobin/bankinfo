'use strict';

const JwtToken = require('./mount/jwttoken');
const HttpError = require('./mount/httperror');

let jwtTokenInstance = null;

module.exports = {
  get jwtToken() {
    if (!jwtTokenInstance) {
      jwtTokenInstance = new JwtToken(this);
    }
    return jwtTokenInstance;
  },
  HttpError,
};
