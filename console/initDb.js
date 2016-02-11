"use strict";

const db = require('../server/models');

//db.sequelize.sync({force: true}).then(function (db1) {
//  for (let i = 1; i < 50; i++) {
//    db1.models.user.create({
//      username: 'user ' + i,
//      email: 'test-' + i + '@test.ru',
//      password: '123456',
//    });
//  }
//}).then(function (user) {
//
//}).catch(function (err) {
//  console.log(err);
//}).done(function () {
//  //db.sequelize.close();
//});

//db.area.sync({force: true});
//db.device.sync({force: true});
db.maintenance.sync({force: true});
db.model.sync({force: true});
db.placing.sync({force: true});
//db.region.sync({force: true});
db.serviceCategory.sync({force: true});
db.serviceType.sync({force: true});
db.type.sync({force: true});
db.vendor.sync({force: true});
db.zone.sync({force: true});
db.zoneUser.sync({force: true});
//db.session.sync({force: true});
