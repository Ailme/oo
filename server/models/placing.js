'use strict';

module.exports = function (sequelize, DataTypes) {
  let Placing = sequelize.define("placing", {
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
    tableName: 'oo_placings',
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

  return Placing;
};
