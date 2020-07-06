'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(params) {
    const userDocument = new this.ctx.model.User({
      name: params.name,
      phone: params.phone,
      password: params.password,
    });

    return await userDocument.save();
  }

  async findByPhone(phone) {
    return await this.ctx.model.User.findOne({ phone });
  }

  async findById(_id) {
    return await this.ctx.model.User.findOne({ _id });
  }
}

module.exports = UserService;
