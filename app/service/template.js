'use strict';

const Service = require('egg').Service;

class TemplateService extends Service {

  async updateOne(params) {
    const { operator, name, ...otherParams } = params;
    return await this.ctx.model.Template.update({ name }, { ...otherParams, operator }, { new: true, upsert: true });
  }

  async delete(id) {
    return await this.ctx.model.Template.findByIdAndDelete(id);
  }

  async find() {
    return await this.ctx.model.Template.find();
  }

}

module.exports = TemplateService;
