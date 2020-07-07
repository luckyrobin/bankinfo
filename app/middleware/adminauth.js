'use strict';

module.exports = () => {
  return async function adminauth(ctx, next) {
    try {
      const { app, request, HttpError, service } = ctx;
      const { userId } = request;

      const userData = await service.user.findById(userId);
      // 如果是管理员，放过
      if (userData.auth === 'admin') {
        return await next();
      }
      throw new HttpError(app.config.errorCode.AUTH_FAILED, '管理员才可以操作');
    } catch (err) {
      ctx.body = {
        code: err.code,
        msg: err.message || '[AUTH] ERROR',
      };
    }
  };
};
