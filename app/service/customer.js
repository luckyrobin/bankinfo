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
    const result = await this.ctx.model.Customer.findById(_id, {}, { lean: true });
    const other = JSON.parse(result.other);
    Reflect.deleteProperty(result, 'other');
    return {
      ...other,
      ...result,
    };
  }

  async delete(id) {
    return await this.ctx.model.Customer.findByIdAndDelete(id);
  }

  async findAll() {
    const result = await this.ctx.model.Customer.find({}, {}, { lean: true }).sort('-update_time');
    return result.map(item => {
      const other = JSON.parse(item.other);
      Reflect.deleteProperty(item, 'other');
      return {
        ...other,
        ...item,
      };
    });
  }

}

module.exports = CustomerService;
