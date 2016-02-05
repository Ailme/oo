'use strict';

const passLib = require('../lib/password');

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 60],
      },
    },
    email: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [4, 64],
      },
    },
    password: {
      type: DataTypes.STRING(128),
      required: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    tableName: 'oo_users',
    engine: 'InnoDB',
    timestamps: true,
    indexes: [],
    defaultScope: {
      order: 'username ASC'
    },
    getterMethods: {},

    setterMethods: {
      password: function (value) {
        this.setDataValue('password', passLib.hash2Sync(value));
      },
    },
    classMethods: {
      matchUser: function *(username, password) {
        let user = yield this.findOne({
          where: {
            $or: [
              {'email': username.toLowerCase()},
              {'username': username.toLowerCase()}
            ]
          }
        });

        if (!user) {
          throw new Error('User not found');
        }

        let check = yield function (done) {
          passLib.verify2(password, user.password, done);
        };

        if (check) {
          return user;
        }

        throw new Error('Password does not match');
      },
      associate: function (models) {

      }
    },
    instanceMethods: {},
  });

  return User;
};
