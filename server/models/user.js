"use strict";

//https://github.com/balderdashy/waterline-docs
const Waterline = require('waterline');

let User = Waterline.Collection.extend({
    // Define a custom table name
    tableName: 'oo_users',
    identity: 'user',
    // Set schema true/false for adapters that support schemaless
    schema: true,
    connection: 'mysql',
    attributes: {
        email: {
            type: 'string',
            required: true,
            email: true
        },
        password: {
            type: 'string',
            password: true,
            minLength: 6,
            maxLength: 21
        },
    },
    passwordConfirmation: function () {
        return this.passwordConfirmation;
    },
    //custom validation rules
    types: {
        password: function (password) {
            return password === this.passwordConfirmation;
        }
    },
    beforeCreate: function (values, next) {
        values.password = '123456';
        next();
    },
    comparePassword: function *(candidatePassword) {
        return yield this.password.test('123456');
    },
    matchUser: function *(email, password) {
        let user = yield this.findOne({'email': email.toLowerCase()}).exec();
        if (!user) {
            throw new Error('User not found');
        }

        if (yield user.comparePassword(password)) {
            return user;
        }

        throw new Error('Password does not match');
    }
});

module.exports = User;
