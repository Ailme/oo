'use strict';

module.exports = function (sequelize, DataTypes) {
  let ZoneUser = sequelize.define("zoneUser", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(10),
      required: true,
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'oo_zone_users',
    engine: 'InnoDB',
    paranoid: false,
    timestamps: false,
    underscored: true,
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

  return ZoneUser;
};
