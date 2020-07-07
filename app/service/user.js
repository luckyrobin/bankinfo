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

  async updateOneById(params) {
    const { _id, ...otherParams } = params;
    return await this.ctx.model.User.findOneAndUpdate({ _id }, { ...otherParams }, { new: true });
  }

  async findByPhone(phone) {
    return await this.ctx.model.User.findOne({ phone });
  }

  async findById(_id) {
    return await this.ctx.model.User.findOne({ _id });
  }

  async delete(id) {
    return await this.ctx.model.User.findByIdAndDelete(id);
  }

  async findMembers() {
    return await this.ctx.model.User.find({ auth: 'user' }, { name: 1, phone: 1, password: 1 });
  }
}

module.exports = UserService;
