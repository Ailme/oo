'use strict';

const LEN = 96;
const SALT_LEN = 16;
const ITERATIONS = 10000;
const DIGEST = 'sha256';

const crypto = require('crypto');

module.exports.hash = hashPassword;
module.exports.hash2 = hashPassword2;
module.exports.hashSync = hashPasswordSync;
module.exports.hash2Sync = hashPassword2Sync;
module.exports.verify = verify;
module.exports.verify2 = verify2;
module.exports.verify2Sync = verify2Sync;
module.exports.salt = generateSalt;

function generateSalt(len) {
  let size = len || SALT_LEN;
  return crypto.randomBytes(size).toString('hex');
}

/**
 * Creates a hash based on a salt from a given password
 * if there is no salt a new salt will be generated
 *
 * @param {String} password
 * @param {String} salt - optional
 */
function hashPasswordSync(password, salt) {
  var len = LEN / 2;

  return crypto.pbkdf2Sync(password, salt, ITERATIONS, len, DIGEST).toString('hex');
}

/**
 * Creates a hash based on a salt from a given password
 * if there is no salt a new salt will be generated
 *
 * @param {String} password
 * @param {String} salt - optional
 * @param {Function} callback
 */
function hashPassword(password, salt, callback) {
  var len = LEN / 2;

  if (3 === arguments.length) {
    crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function (err, derivedKey) {
      if (err) {
        return callback(err);
      }

      return callback(null, derivedKey.toString('hex'));
    });
  } else {
    callback = salt;
    crypto.randomBytes(SALT_LEN / 2, function (err, salt) {
      if (err) {
        return callback(err);
      }

      salt = salt.toString('hex');
      crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function (err, derivedKey) {
        if (err) {
          return callback(err);
        }

        callback(null, derivedKey.toString('hex'), salt);
      });
    });
  }
}


/**
 * Verifies if a password matches a hash by hashing the password
 * with a given salt
 *
 * @param {String} password
 * @param {String} hash
 * @param {String} salt
 * @param {Function} callback
 */
function verify(password, hash, salt, callback) {
  hashPassword(password, salt, function (err, hashedPassword) {
    if (err) {
      return callback(err);
    }

    if (hashedPassword === hash) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
}

/**
 *
 * @param password
 * @param callback
 */
function hashPassword2(password, callback) {
  let salt = generateSalt();
  salt = salt.slice(0, salt.length - 1);

  hashPassword(password, salt, function (err, hash) {
    if (err) {
      return callback(err);
    }

    hash = salt + '$' + hash;

    return callback(null, hash);
  });
}

/**
 * Verifies if a password matches a hash by hashing the password
 * with a given salt
 *
 * @param {String} password
 * @param {String} hash
 * @param {Function} callback
 */
function verify2(password, hash, callback) {
  let parts = hash.split('$');
  hashPassword(password, parts[0], function (err, hashedPassword) {
    if (err) {
      return callback(err);
    }

    callback(null, hashedPassword === parts[1]);
  });
}

/**
 * Verifies if a password matches a hash by hashing the password
 * with a given salt
 *
 * @param {String} password
 * @param {String} hash
 */
function verify2Sync(password, hash) {
  let parts = hash.split('$');
  let hashedPassword = hashPasswordSync(password, parts[0]);

  return hashedPassword === parts[1]
}

/**
 *
 * @param password
 */
function hashPassword2Sync(password) {
  let salt = generateSalt();
  salt = salt.slice(0, salt.length - 1);

  let hash = hashPasswordSync(password, salt);
  return salt + '$' + hash;
}
