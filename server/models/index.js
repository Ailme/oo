'use strict';

const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || "development";
const config = require('../config/db');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

let db = {};

// read all models and import them into the "db" object
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.indexOf('_') !== 0);
  })
  .forEach(function (file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
