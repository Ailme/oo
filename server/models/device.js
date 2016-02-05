'use strict';

module.exports = function (sequelize, DataTypes) {
  let Device = sequelize.define("device", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

  }, {
    tableName: 'oo_devices',
    engine: 'InnoDB',
    paranoid: true,
    timestamps: true,
    indexes: [],
    defaultScope: {},
    getterMethods: {},
    setterMethods: {},
    classMethods: {
      associate: function (models) {
      }
    },
    instanceMethods: {},
  });

  return Device;
};
