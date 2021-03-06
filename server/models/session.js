'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("session", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    blob: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  }, {
    tableName: 'oo_sessions',
    engine: 'MYISAM',
    underscored: true,
  });
};
