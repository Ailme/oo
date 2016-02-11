'use strict';

module.exports = function (sequelize, DataTypes) {
  let Maintenance = sequelize.define("maintenance", {
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
    day_1_begin: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_1_end: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_2_begin: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_2_end: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_3_begin: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_3_end: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_4_begin: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_4_end: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_5_begin: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_5_end: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_6_begin: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_6_end: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_7_begin: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    day_7_end: {
      type: DataTypes.STRING(5),
      required: false,
      allowNull: false,
    },
    work_in_holiday: {
      type: DataTypes.BOOLEAN,
      required: false,
      default: 0,
    },
    work_in_night: {
      type: DataTypes.BOOLEAN,
      required: false,
      default: 0,
    },
    days: {
      type: DataTypes.INTEGER(1),
      required: true,
      default: 0,
    },
  }, {
    tableName: 'oo_maintenances',
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
    instanceMethods: {
      getDay1: function () {
        return this.day_1_begin ? this.day_1_begin + ' - ' + this.day_1_end : '-';
      }
    },
  });

  return Maintenance;
};
