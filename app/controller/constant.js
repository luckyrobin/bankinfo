'use strict';

const HttpController = require('./base/http');

class ConstantController extends HttpController {

  async index() {
    const { service } = this.ctx;
    try {
      const resp = await service.constant.findOnly();
      const content = resp && resp.content;
      this.success({
        data: content && JSON.parse(content) || {},
      });
    } catch (err) {
      this.fail({
        status: err.status,
        code: err.code,
        msg: err.message,
      });
    }
  }

  async create() {
    const { request, service } = this.ctx;
    const body = request.body;
    const { userId } = request;

    const updatedParams = {
      ...body,
      operator: userId,
    };

    try {
      const info = await service.constant.updateOneByGlobal({
        ...updatedParams,
      });
      this.success({
        data: info,
      });
    } catch (err) {
      this.fail({
        status: err.status,
        code: err.code,
        msg: err.message,
      });
    }
  }

  async destroy() {
    const { params, service } = this.ctx;
    try {
      const resp = await service.constant.delete(params.id);
      this.success({
        data: {
          _id: resp._id,
        },
      });
    } catch (err) {
      this.fail({
        status: err.status,
        code: err.code,
        msg: err.message,
      });
    }
  }
}

module.exports = ConstantController;
