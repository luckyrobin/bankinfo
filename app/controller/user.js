'use strict';

const HttpController = require('./base/http');

class UserController extends HttpController {
  async create() {
    const { request, service } = this.ctx;
    const body = request.body;

    try {
      const resp = await service.user.create({
        name: body.name,
        phone: body.phone,
        password: body.password,
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
      const resp = await service.user.findMembers();
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
    const { params, request, service, HttpError, app } = this.ctx;
    const body = request.body;
    const { userId } = request;
    try {
      const updatedParams = {};
      Reflect.has(body, 'name') && (updatedParams.name = body.name);
      Reflect.has(body, 'phone') && (updatedParams.phone = body.phone);
      if (Reflect.has(body, 'password')) {
        const info = await this.service.user.findById(userId);
        // 如果管理自己操作，需要校验密码
        if (userId === params.id) {
          if (!Reflect.has(body, 'newPassword')) throw new HttpError(app.config.errorCode.MISS_PARAMS, '请输入需要新密码');
          if (info.password !== body.password) throw new HttpError('原始密码错误');
          updatedParams.password = body.newPassword;
        } else {
          updatedParams.password = body.password;
        }
      }

      const info = await service.user.updateOneById({
        ...{ _id: params.id },
        ...updatedParams,
      });
      this.success({
        data: {
          _id: info._id,
          name: info.name,
          phone: info.phone,
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

  async destroy() {
    const { params, service } = this.ctx;
    try {
      const resp = await service.user.delete(params.id);
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

  async currentUser() {
    const { request } = this.ctx;
    const { userId } = request;
    try {
      const info = await this.service.user.findById(userId);
      this.success({
        data: {
          _id: info._id,
          name: info.name,
          phone: info.phone,
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

  async login() {
    const { app, request, HttpError, jwtToken } = this.ctx;
    const body = request.body;
    try {
      const info = await this.service.user.findByPhone(body.phone);
      if (!info) throw new HttpError(app.config.errorCode.VALID_FAILED, '该用户不存在');
      if (info.password !== body.password) throw new HttpError(app.config.errorCode.VALID_FAILED, '用户名或密码错误');

      const token = await jwtToken.generate({ uid: `${info._id}` });
      this.success({
        data: {
          token,
          currentAuthority: info.auth,
          status: 'ok',
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

module.exports = UserController;
