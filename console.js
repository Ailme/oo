"use strict";

const app = require("koa")();
const config = require('./config/main');

app.name = config.name;
app.keys = config.keys;
app.env = config.env;

//app.use(require('koa-bodyparser')(config.bodyparser));
//app.use(require('koa-swig-render')(config.templates));
//app.use(require('koa-error')(config.error));
//app.use(require('koa-logger')());

require('./config/database')(app, config, function (err, ontology) {
  if (err) {
    throw err
  }

  app.context.models = ontology.collections;

  let User = ontology.collections.user;
  for (let i = 4; i < 50; i++) {
    User.create({
      username: 'user ' + i,
      password: '123456',
      email: 'test' + i + '@mail.ru',
    }, function (err, user) {
      console.log(user);
    });
  }

  console.log('database adapter initialized');
});

