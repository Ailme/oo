"use strict";

const config = require("./main");
const router = require("koa-router")();

const siteController = require(config.path.controllers + '/site');
const userController = require(config.path.controllers + '/user');
const authController = require(config.path.controllers + '/auth');
const testController = require(config.path.controllers + '/test');

let secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    //yield next;
    //this.status = 401;
    this.redirect('/login');
  }
};

module.exports = function (app, passport) {
  // auth
  router.all('/getCurrentUser', authController.getCurrentUser);
  router.get("/login", authController.login);
  router.post('/login', authController.doLogin);
  router.all('/logout', authController.logout);
  // test
  router.all('/test', testController.index);
  // index
  router.get("/", siteController.index);
  // user
  router.get("/user", secured, userController.index);
  router.post("/user", secured, userController.create);
  router.get("/user/:id", secured, userController.info);
  router.post("/user/:id", secured, userController.update);
  router.del("/user/:id", secured, userController.delete);
  router.post("/user/updateStatus/:id", secured, userController.updateStatus);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
