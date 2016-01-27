"use strict";

const mount = require('koa-mount');
const router = require("koa-router")();
const config = require("./main");

const siteController = require(config.path.controllers + '/site');
const userController = require(config.path.controllers + '/user');
const authController = require(config.path.controllers + '/auth');

module.exports = function (app, passport) {

  router
  // index
    .get("/", siteController.index)
    // auth
    .get("/login", authController.login)
    .post('/login', authController.doLogin)
    .all('/logout', authController.logout)
    // user
    .get("/user", userController.index)
    .post("/user", userController.create)
    .put("/user/:id", userController.update)
    .del("/user/:id", userController.delete)
  ;

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
