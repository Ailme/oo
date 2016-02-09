'use strict';

module.exports = function (sequelize, DataTypes) {
  let Device = sequelize.define("device", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientName: {
      field: 'client_name',
      type: DataTypes.STRING(128),
      required: false,
      allowNull: false,
    },
  }, {
    tableName: 'oo_devices',
    engine: 'InnoDB',
    paranoid: true,
    timestamps: true,
    underscored: true,
    indexes: [],
    defaultScope: {},
    getterMethods: {},
    setterMethods: {},
    classMethods: {
      associate: function (models) {
        Device.belongsTo(models.user, {
          as: 'client',
          onDelete: "SET NULL",
          foreignKey: {
            allowNull: true
          }
        });
      }
    },
    instanceMethods: {},
  });

  return Device;
};
