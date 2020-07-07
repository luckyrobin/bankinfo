'use strict';

module.exports = () => {
  return async function apiauth(ctx, next) {
    const { HttpError, app } = ctx;
    try {
      const token = ctx.request.header.authorization;
      if (!token) throw new HttpError(app.config.errorCode.RE_LOGIN);
      const verify = ctx.jwtToken.check(token);
      ctx.request.userId = verify.uid;
      await next();
    } catch (err) {
      ctx.body = {
        code: err.code,
        msg: err.message || '[AUTH] ERROR',
      };
    }
  };
};
