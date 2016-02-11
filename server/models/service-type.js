'use strict';

module.exports = function (sequelize, DataTypes) {
  let Type = sequelize.define("serviceType", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(60),
      required: true,
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'oo_service_types',
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

  return Type;
};
