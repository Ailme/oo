"use strict";

const mount = require('koa-mount');
const config = require("./main");

const siteController = require(config.path.controllers + '/site');
const userController = require(config.path.controllers + '/user');
const authController = require(config.path.controllers + '/auth');

let secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    //this.status = 401;
    this.redirect('/login');
  }
};

module.exports = function (app, passport) {
  let secureRouter = require("koa-router")();
  let router = require("koa-router")();

  // auth
  secureRouter.get("/login", authController.login);
  secureRouter.post('/login', authController.doLogin);

  app
    .use(secureRouter.routes())
    .use(secureRouter.allowedMethods())
    .use(secured);

  router.all('/logout', authController.logout);
  // index
  router.get("/", siteController.index);
  // user
  router.get("/user", userController.index);
  router.post("/user", userController.create);
  router.get("/user/:id", userController.info);
  router.post("/user/:id", userController.update);
  router.del("/user/:id", userController.delete);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
