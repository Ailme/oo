"use strict";

const db = require('../server/models');

db.sequelize.sync({force: true}).then(function (db1) {
  for (let i = 1; i < 50; i++) {
    db1.models.user.create({
      username: 'user ' + i,
      email: 'test-' + i + '@test.ru',
      password: '123456',
    });
  }
}).then(function (user) {

}).catch(function (err) {
  console.log(err);
}).done(function () {
  //db.sequelize.close();
});

//db.category.sync({force: true});
