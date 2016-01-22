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
        .get("/user/create", userController.create)
        .post("/user/create", userController.doCreate)
    ;

    app
        .use(router.routes())
        .use(router.allowedMethods());
};
