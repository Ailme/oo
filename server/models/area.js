'use strict';

module.exports = function (sequelize, DataTypes) {
  let Area = sequelize.define("area", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(128),
      required: true,
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'oo_areas',
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

  return Area;
};
