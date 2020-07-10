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
    };

    try {
      const resp = await service.customer.create({
        // ...body,
        ...createParams,
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
      const result = resp.map(item => {
        const other = JSON.parse(item.other);
        return {
          _id: item._id,
          customer_name: item.customer_name,
          customer_id: item.customer_id,
          operator: item.operator,
          create_time: item.create_time,
          update_time: item.update_time,
          ...other,
        };
      });
      this.success({
        data: result,
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

    const { customer_name, customer_id, ...other } = updatedParams;
    const finalParams = {
      customer_name,
      customer_id,
      other: JSON.stringify(other),
      operator: userId,
    };

    try {
      const info = await service.customer.updateOneById({
        ...{ _id: params.id },
        ...finalParams,
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
