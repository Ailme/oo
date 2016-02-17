"use strict";

const config = require("./main");
const router = require("koa-router")({
  prefix: '/api/v1'
});

const UserController = require(config.path.api + '/v1/user');
const AuthController = require(config.path.api + '/v1/auth');
const DeviceController = require(config.path.api + '/v1/device');
const RegionController = require(config.path.api + '/v1/region');
const AreaController = require(config.path.api + '/v1/area');
const PlacingController = require(config.path.api + '/v1/placing');
const ZoneController = require(config.path.api + '/v1/zone');
const ZoneUserController = require(config.path.api + '/v1/zone-user');
const VendorController = require(config.path.api + '/v1/vendor');
const ModelController = require(config.path.api + '/v1/model');
const TypeController = require(config.path.api + '/v1/type');
const ServiceTypeController = require(config.path.api + '/v1/service-type');
const ServiceCategoryController = require(config.path.api + '/v1/service-category');
const MaintenanceController = require(config.path.api + '/v1/maintenance');

let secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

module.exports = function (app, passport) {
  /** API **/
    // auth
  router.all('/getCurrentUser', AuthController.getCurrentUser);
  // user
  router.get("/user", secured, UserController.index);
  router.post("/user", secured, UserController.create);
  router.get("/user/:id", secured, UserController.info);
  router.post("/user/:id", secured, UserController.update);
  router.del("/user/:id", secured, UserController.delete);
  router.post("/user/updateStatus/:id", secured, UserController.updateStatus);
  // device
  router.get("/device", secured, DeviceController.index);
  //router.post("/device", secured, apiDeviceControllerV1.create);
  //router.get("/device/:id", secured, apiDeviceControllerV1.info);
  //router.post("/device/:id", secured, apiDeviceControllerV1.update);
  //router.del("/device/:id", secured, apiDeviceControllerV1.delete);
  // region
  router.get("/region", secured, RegionController.index);
  router.post("/region", secured, RegionController.create);
  router.post("/region/import", secured, RegionController.import);
  router.get("/region/:id", secured, RegionController.info);
  router.post("/region/:id", secured, RegionController.update);
  router.del("/region/:id", secured, RegionController.delete);
  // area
  router.get("/area", secured, AreaController.index);
  router.post("/area", secured, AreaController.create);
  router.post("/area/import", secured, AreaController.import);
  router.get("/area/:id", secured, AreaController.info);
  router.post("/area/:id", secured, AreaController.update);
  router.del("/area/:id", secured, AreaController.delete);
  // placing
  router.get("/placing", secured, PlacingController.index);
  router.post("/placing", secured, PlacingController.create);
  router.get("/placing/:id", secured, PlacingController.info);
  router.post("/placing/:id", secured, PlacingController.update);
  router.del("/placing/:id", secured, PlacingController.delete);
  // zone
  router.get("/zone", secured, ZoneController.index);
  router.post("/zone", secured, ZoneController.create);
  router.get("/zone/:id", secured, ZoneController.info);
  router.post("/zone/:id", secured, ZoneController.update);
  router.del("/zone/:id", secured, ZoneController.delete);
  // zone-user
  router.get("/zone-user", secured, ZoneUserController.index);
  router.post("/zone-user", secured, ZoneUserController.create);
  router.get("/zone-user/:id", secured, ZoneUserController.info);
  router.post("/zone-user/:id", secured, ZoneUserController.update);
  router.del("/zone-user/:id", secured, ZoneUserController.delete);
  // zone
  router.get("/vendor", secured, VendorController.index);
  router.post("/vendor", secured, VendorController.create);
  router.get("/vendor/:id", secured, VendorController.info);
  router.post("/vendor/:id", secured, VendorController.update);
  router.del("/vendor/:id", secured, VendorController.delete);
  // model
  router.get("/model", secured, ModelController.index);
  router.post("/model", secured, ModelController.create);
  router.get("/model/:id", secured, ModelController.info);
  router.post("/model/:id", secured, ModelController.update);
  router.del("/model/:id", secured, ModelController.delete);
  // type
  router.get("/type", secured, TypeController.index);
  router.post("/type", secured, TypeController.create);
  router.get("/type/:id", secured, TypeController.info);
  router.post("/type/:id", secured, TypeController.update);
  router.del("/type/:id", secured, TypeController.delete);
  // service-type
  router.get("/service-type", secured, ServiceTypeController.index);
  router.post("/service-type", secured, ServiceTypeController.create);
  router.get("/service-type/:id", secured, ServiceTypeController.info);
  router.post("/service-type/:id", secured, ServiceTypeController.update);
  router.del("/service-type/:id", secured, ServiceTypeController.delete);
  // service-category
  router.get("/service-category", secured, ServiceCategoryController.index);
  router.post("/service-category", secured, ServiceCategoryController.create);
  router.get("/service-category/:id", secured, ServiceCategoryController.info);
  router.post("/service-category/:id", secured, ServiceCategoryController.update);
  router.del("/service-category/:id", secured, ServiceCategoryController.delete);
  // maintenance
  router.get("/maintenance", secured, MaintenanceController.index);
  router.post("/maintenance", secured, MaintenanceController.create);
  router.get("/maintenance/:id", secured, MaintenanceController.info);
  router.post("/maintenance/:id", secured, MaintenanceController.update);
  router.del("/maintenance/:id", secured, MaintenanceController.delete);
  /** END API **/

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
