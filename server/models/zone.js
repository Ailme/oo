'use strict';

module.exports = function (sequelize, DataTypes) {
  let Zone = sequelize.define("zone", {
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
    tableName: 'oo_zones',
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

  return Zone;
};
