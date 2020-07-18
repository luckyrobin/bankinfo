'use strict';

const HttpController = require('./base/http');

class CustomerController extends HttpController {
  async create() {
    const { request, service } = this.ctx;
    const body = request.body;
    const { userId } = request;

    const { customer_name, customer_id, ...other } = body;
    const createParams = {
      customer_name,
      customer_id,
      other: JSON.stringify(other || {}),
      creator: userId,
      operator: userId,
    };

    try {
      const resp = await service.customer.create({
        // ...body,
        ...createParams,
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
    const { service, request, query } = this.ctx;
    const { userId } = request;
    const { search = '' } = query;
    try {
      let resp = {};
      const userData = await service.user.findById(userId);
      if (search.length > 0) {
        resp = await service.customer.findBySearch(search);
      } else if (userData.auth === 'admin') {
        resp = await service.customer.findAll();
      } else {
        resp = await service.customer.findMyLast(userId);
      }
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

    Reflect.deleteProperty(body, 'create_time');
    Reflect.deleteProperty(body, 'update_time');
    Reflect.deleteProperty(body, 'operator');
    Reflect.deleteProperty(body, 'creator');
    Reflect.deleteProperty(body, '__v');
    Reflect.deleteProperty(body, 'other');

    const { customer_name, customer_id, ...other } = body;
    const updatedParams = {
      customer_name,
      customer_id,
      other: JSON.stringify(other),
      operator: userId,
    };

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

  async drop() {
    const { service } = this.ctx;
    try {
      const resp = await service.customer.drop();
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
}

module.exports = CustomerController;
