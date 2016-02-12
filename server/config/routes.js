"use strict";

const config = require("./main");
const router = require("koa-router")();

const testController = require(config.path.controllers + '/test');
const authController = require(config.path.controllers + '/auth');
const regionController = require(config.path.controllers + '/region');

const apiUserControllerV1 = require(config.path.controllers + '/api/v1/user');
const apiAuthControllerV1 = require(config.path.controllers + '/api/v1/auth');
const apiDeviceControllerV1 = require(config.path.controllers + '/api/v1/device');
const apiRegionControllerV1 = require(config.path.controllers + '/api/v1/region');
const apiAreaControllerV1 = require(config.path.controllers + '/api/v1/area');
const apiPlacingControllerV1 = require(config.path.controllers + '/api/v1/placing');
const apiZoneControllerV1 = require(config.path.controllers + '/api/v1/zone');
const apiZoneUserControllerV1 = require(config.path.controllers + '/api/v1/zone-user');
const apiVendorControllerV1 = require(config.path.controllers + '/api/v1/vendor');
const apiModelControllerV1 = require(config.path.controllers + '/api/v1/model');
const apiTypeControllerV1 = require(config.path.controllers + '/api/v1/type');
const apiServiceTypeControllerV1 = require(config.path.controllers + '/api/v1/service-type');
const apiServiceCategoryControllerV1 = require(config.path.controllers + '/api/v1/service-category');
const apiMaintenanceControllerV1 = require(config.path.controllers + '/api/v1/maintenance');

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
  /** API **/
    // auth
  router.all('/api/v1/getCurrentUser', apiAuthControllerV1.getCurrentUser);
  // user
  router.get("/api/v1/user", secured, apiUserControllerV1.index);
  router.post("/api/v1/user", secured, apiUserControllerV1.create);
  router.get("/api/v1/user/:id", secured, apiUserControllerV1.info);
  router.post("/api/v1/user/:id", secured, apiUserControllerV1.update);
  router.del("/api/v1/user/:id", secured, apiUserControllerV1.delete);
  router.post("/api/v1/user/updateStatus/:id", secured, apiUserControllerV1.updateStatus);
  // device
  router.get("/api/v1/device", secured, apiDeviceControllerV1.index);
  //router.post("/api/v1/device", secured, apiDeviceControllerV1.create);
  //router.get("/api/v1/device/:id", secured, apiDeviceControllerV1.info);
  //router.post("/api/v1/device/:id", secured, apiDeviceControllerV1.update);
  //router.del("/api/v1/device/:id", secured, apiDeviceControllerV1.delete);
  // region
  router.get("/api/v1/region", secured, apiRegionControllerV1.index);
  router.post("/api/v1/region", secured, apiRegionControllerV1.create);
  router.post("/api/v1/region/import", secured, apiRegionControllerV1.import);
  router.get("/api/v1/region/:id", secured, apiRegionControllerV1.info);
  router.post("/api/v1/region/:id", secured, apiRegionControllerV1.update);
  router.del("/api/v1/region/:id", secured, apiRegionControllerV1.delete);
  // area
  router.get("/api/v1/area", secured, apiAreaControllerV1.index);
  router.post("/api/v1/area", secured, apiAreaControllerV1.create);
  router.get("/api/v1/area/:id", secured, apiAreaControllerV1.info);
  router.post("/api/v1/area/:id", secured, apiAreaControllerV1.update);
  router.del("/api/v1/area/:id", secured, apiAreaControllerV1.delete);
  // placing
  router.get("/api/v1/placing", secured, apiPlacingControllerV1.index);
  router.post("/api/v1/placing", secured, apiPlacingControllerV1.create);
  router.get("/api/v1/placing/:id", secured, apiPlacingControllerV1.info);
  router.post("/api/v1/placing/:id", secured, apiPlacingControllerV1.update);
  router.del("/api/v1/placing/:id", secured, apiPlacingControllerV1.delete);
  // zone
  router.get("/api/v1/zone", secured, apiZoneControllerV1.index);
  router.post("/api/v1/zone", secured, apiZoneControllerV1.create);
  router.get("/api/v1/zone/:id", secured, apiZoneControllerV1.info);
  router.post("/api/v1/zone/:id", secured, apiZoneControllerV1.update);
  router.del("/api/v1/zone/:id", secured, apiZoneControllerV1.delete);
  // zone-user
  router.get("/api/v1/zone-user", secured, apiZoneUserControllerV1.index);
  router.post("/api/v1/zone-user", secured, apiZoneUserControllerV1.create);
  router.get("/api/v1/zone-user/:id", secured, apiZoneUserControllerV1.info);
  router.post("/api/v1/zone-user/:id", secured, apiZoneUserControllerV1.update);
  router.del("/api/v1/zone-user/:id", secured, apiZoneUserControllerV1.delete);
  // zone
  router.get("/api/v1/vendor", secured, apiVendorControllerV1.index);
  router.post("/api/v1/vendor", secured, apiVendorControllerV1.create);
  router.get("/api/v1/vendor/:id", secured, apiVendorControllerV1.info);
  router.post("/api/v1/vendor/:id", secured, apiVendorControllerV1.update);
  router.del("/api/v1/vendor/:id", secured, apiVendorControllerV1.delete);
  // model
  router.get("/api/v1/model", secured, apiModelControllerV1.index);
  router.post("/api/v1/model", secured, apiModelControllerV1.create);
  router.get("/api/v1/model/:id", secured, apiModelControllerV1.info);
  router.post("/api/v1/model/:id", secured, apiModelControllerV1.update);
  router.del("/api/v1/model/:id", secured, apiModelControllerV1.delete);
  // type
  router.get("/api/v1/type", secured, apiTypeControllerV1.index);
  router.post("/api/v1/type", secured, apiTypeControllerV1.create);
  router.get("/api/v1/type/:id", secured, apiTypeControllerV1.info);
  router.post("/api/v1/type/:id", secured, apiTypeControllerV1.update);
  router.del("/api/v1/type/:id", secured, apiTypeControllerV1.delete);
  // service-type
  router.get("/api/v1/service-type", secured, apiServiceTypeControllerV1.index);
  router.post("/api/v1/service-type", secured, apiServiceTypeControllerV1.create);
  router.get("/api/v1/service-type/:id", secured, apiServiceTypeControllerV1.info);
  router.post("/api/v1/service-type/:id", secured, apiServiceTypeControllerV1.update);
  router.del("/api/v1/service-type/:id", secured, apiServiceTypeControllerV1.delete);
  // service-category
  router.get("/api/v1/service-category", secured, apiServiceCategoryControllerV1.index);
  router.post("/api/v1/service-category", secured, apiServiceCategoryControllerV1.create);
  router.get("/api/v1/service-category/:id", secured, apiServiceCategoryControllerV1.info);
  router.post("/api/v1/service-category/:id", secured, apiServiceCategoryControllerV1.update);
  router.del("/api/v1/service-category/:id", secured, apiServiceCategoryControllerV1.delete);
  // maintenance
  router.get("/api/v1/maintenance", secured, apiMaintenanceControllerV1.index);
  router.post("/api/v1/maintenance", secured, apiMaintenanceControllerV1.create);
  router.get("/api/v1/maintenance/:id", secured, apiMaintenanceControllerV1.info);
  router.post("/api/v1/maintenance/:id", secured, apiMaintenanceControllerV1.update);
  router.del("/api/v1/maintenance/:id", secured, apiMaintenanceControllerV1.delete);
  /** END API **/

    // index
  router.all('/test', testController.index);
  router.get("/user", secured, function *() {
    yield this.render('user/index');
  });
  router.get("/", secured, function *() {
    yield this.render('device/index');
  });
  router.get("/region", secured, function *() {
    yield this.render('region/index');
  });
  //router.get("/region/import", secured, regionController.import);
  //router.post("/region/import", secured, regionController.doImport);

  router.get("/area", secured, function *() {
    yield this.render('area/index');
  });
  router.get("/placing", secured, function *() {
    yield this.render('placing/index');
  });
  router.get("/zone", secured, function *() {
    yield this.render('zone/index');
  });
  router.get("/zone-user", secured, function *() {
    yield this.render('zone-user/index');
  });
  router.get("/vendor", secured, function *() {
    yield this.render('vendor/index');
  });
  router.get("/model", secured, function *() {
    yield this.render('model/index');
  });
  router.get("/type", secured, function *() {
    yield this.render('type/index');
  });
  router.get("/service-type", secured, function *() {
    yield this.render('service-type/index');
  });
  router.get("/service-category", secured, function *() {
    yield this.render('service-category/index');
  });
  router.get("/maintenance", secured, function *() {
    yield this.render('maintenance/index');
  });
  router.get("/login", authController.login);
  router.post('/login', authController.doLogin);
  router.all('/logout', authController.logout);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
