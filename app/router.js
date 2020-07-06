'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;

  router.post('/api/login', controller.user.login);

  router.get('/api/currentUser', middleware.apiauth(), controller.user.currentUser);

  router.resources('/api/user', controller.user);

  router.get('*', controller.home.index);
};
