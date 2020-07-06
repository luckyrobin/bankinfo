'use strict';

const HttpController = require('./base/http');

class UserController extends HttpController {
  async create() {
    const { request } = this.ctx;
    const body = request.body;

    try {
      const resp = await this.service.user.create({
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

  async delete() {}

  async currentUser() {
    const { request } = this.ctx;
    const { userId } = request;
    try {
      const info = await this.service.user.findById(userId);
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
