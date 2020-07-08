'use strict';

const HttpController = require('./base/http');

class CustomerController extends HttpController {
  async create() {
    const { request, service } = this.ctx;
    const body = request.body;
    const { userId } = request;

    try {
      const resp = await service.customer.create({
        ...body,
        ...{
          creator: userId,
          operator: userId,
        },
      });

      this.success({
        data: resp,
      });
    } catch (err) {
      this.fail({
        status: err.status,
        code: err.code,
        msg: err.message,
      });
    }
  }

  async index() {
    const { service } = this.ctx;
    try {
      const resp = await service.customer.findAll();
      this.success({
        data: resp,
      });
    } catch (err) {
      this.fail({
        status: err.status,
        code: err.code,
        msg: err.message,
      });
    }
  }

  async update() {
    const { params, request, service } = this.ctx;
    const body = request.body;
    const { userId } = request;

    const updatedParams = { ...body };
    Reflect.deleteProperty(updatedParams, 'create_time');
    Reflect.deleteProperty(updatedParams, 'update_time');
    Reflect.deleteProperty(updatedParams, '__v');
    Reflect.deleteProperty(updatedParams, 'operator');
    Reflect.deleteProperty(updatedParams, 'creator');
    updatedParams.operator = userId;

    try {
      const info = await service.customer.updateOneById({
        ...{ _id: params.id },
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
      const resp = await service.customer.delete(params.id);
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

module.exports = CustomerController;
