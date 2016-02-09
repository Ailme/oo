'use strict';

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define("sdUser", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(200),
    },
    email: {
      type: DataTypes.STRING(64),
      unique: true,
    },
    role: {
      type: DataTypes.STRING(20),
    },
    hidden: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: false,
      defaultValue: "N"
    },
  }, {
    tableName: 'users',
    engine: 'InnoDB',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    indexes: [],
    defaultScope: {
      order: 'username ASC'
    },
    getterMethods: {},
    setterMethods: {},
    classMethods: {
      associate: function (models) {

      }
    },
    instanceMethods: {},
  });

  return User;
};
