'use strict';

const Service = require('egg').Service;

class ConstantService extends Service {

  async updateOneByGlobal(params) {
    const { operator, ...otherParams } = params;
    return await this.ctx.model.Constant.update({ global: 'only' }, { content: JSON.stringify(otherParams), operator }, { new: true, upsert: true });
  }

  async delete(id) {
    return await this.ctx.model.Constant.findByIdAndDelete(id);
  }

  async findOnly() {
    return await this.ctx.model.Constant.findOne({ global: 'only' }, { _id: 0, content: 1 });
  }
}

module.exports = ConstantService;
