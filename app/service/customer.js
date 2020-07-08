'use strict';

const Service = require('egg').Service;

class CustomerService extends Service {
  async create(params) {
    const customerDocument = new this.ctx.model.Customer({
      ...params,
    });

    return await customerDocument.save();
  }

  async updateOneById(params) {
    const { _id, ...otherParams } = params;
    return await this.ctx.model.Customer.findOneAndUpdate({ _id }, { ...otherParams }, { new: true });
  }

  async findById(_id) {
    return await this.ctx.model.Customer.findOne({ _id });
  }

  async delete(id) {
    return await this.ctx.model.Customer.findByIdAndDelete(id);
  }

  async findAll() {
    return await this.ctx.model.Customer.find();
  }

}

module.exports = CustomerService;
