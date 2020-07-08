'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;

  router.post('/api/login', controller.user.login);

  router.get('/api/currentUser', middleware.apiauth(), controller.user.currentUser);

  router.resources('/api/user', middleware.apiauth(), middleware.adminauth(), controller.user);

  router.resources('/api/customer', middleware.apiauth(), controller.customer);

  router.get('*', controller.home.index);
};
