'use strict';

const Controller = require('egg').Controller;

class HttpController extends Controller {
  async success(params) {
    this.ctx.body = {
      code: 0,
      msg: params.msg || 'ok',
      data: params && params.data,
    };
  }

  async fail(params) {
    this.logger.error(params);
    this.ctx.status = params.status || 200;
    this.ctx.body = {
      code: params.code || 1,
      msg: params.msg || 'failed',
      data: params && params.data,
    };
  }
}

module.exports = HttpController;
