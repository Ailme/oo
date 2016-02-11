'use strict';

module.exports = function (sequelize, DataTypes) {
  let Model = sequelize.define("model", {
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
    tableName: 'oo_models',
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

  return Model;
};
