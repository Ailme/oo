"use strict";

const app = require("koa")();
const config = require('./config/main');
const sessionConfig = require('./config/session');
const path = require('./config/path');
const assets = require(path.assets + "/assets.json");
const passport = require('koa-passport');

app.name = config.name;
app.keys = config.keys;
app.env = config.env;

require('koa-locale')(app);
app.use(require('koa-bodyparser')(config.bodyparser));
app.use(require('koa-i18n')(app, config.i18n));
app.use(require('koa-favicon')(path.public + '/favicon.ico'));
app.use(require('koa-static')(path.public, config.static));
app.use(require('koa-generic-session')(sessionConfig));
app.use(require('koa-flash')(config.flash));

require('./config/auth')(passport, app);
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./lib/is-guest'));
app.use(require('./lib/is-ajax'));
app.use(require('./lib/assets')(assets));

app.use(require('koa-swig-render')(config.templates));
app.use(require('koa-error')(config.error));
app.use(require('koa-logger')());
app.use(require('koa-compress')());
app.use(require('koa-response-time')());

require('./config/routes')(app, passport);

module.exports.app = app;
module.exports.config = config;
