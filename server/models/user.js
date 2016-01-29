"use strict";

//https://github.com/balderdashy/waterline-docs
const Waterline = require('waterline');
const passLib = require('../lib/password');

let User = Waterline.Collection.extend({
  // Define a custom table name
  tableName: 'oo_users',
  identity: 'user',
  // Set schema true/false for adapters that support schemaless
  schema: true,
  connection: 'mysql',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: 'string',
      required: true,
      minLength: 6,
      size: 128,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      email: true,
      size: 64
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
      maxLength: 21,
      size: 128,
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    },
  },
  //custom validation rules
  types: {},
  beforeCreate: function (values, next) {
    passLib.hash2(values.password, function (err, hash) {
      values.password = hash;
      next();
    });
  },
  matchUser: function *(email, password) {
    let user = yield function (done) {
      this.findOne({'email': email.toLowerCase()}).exec(done);
    }.bind(this);

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
  }
});

module.exports = User;
