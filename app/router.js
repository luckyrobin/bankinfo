'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;

  router.post('/api/login', controller.user.login);

  router.get('/api/currentUser', middleware.apiauth(), controller.user.currentUser);

  router.resources('/api/customer', middleware.apiauth(), controller.customer);

  router.resources('/api/user', middleware.apiauth(), middleware.adminauth(), controller.user);

  router.get('/api/customer/drop', middleware.apiauth(), middleware.adminauth(), controller.customer.drop);

  router.get('/api/constant', middleware.apiauth(), controller.constant.index);

  router.post('/api/constant', middleware.apiauth(), middleware.adminauth(), controller.constant.create);

  router.resources('/api/template', middleware.apiauth(), controller.template);

  router.put('/api/template/print/:id', middleware.apiauth(), controller.template.print);

  router.get('*', controller.home.index);
};
