'use strict';

let SequelizeStore = function (Session) {
  this.Session = Session;
};

/**
 * Load data
 */

// for koa-sess
SequelizeStore.prototype.get = function *(sid, parse) {
  try {
    let data = yield this.Session.find({id: sid});
    if (data && data.id) {
      if (parse === false) return data.blob;
      return JSON.parse(data.blob);
    } else {
      return null;
    }
  } catch (err) {
    console.error(err.stack);
    return null;
  }
};

// for koa-session-store
SequelizeStore.prototype.load = function *(sid) {
  return yield this.get(sid, false);
};

/**
 * Save data
 */
SequelizeStore.prototype.set = SequelizeStore.prototype.save = function *(sid, blob) {
  try {
    let userId = blob.passport.user || null;
    if (typeof blob === 'object') blob = JSON.stringify(blob);
    let data = {
      id: sid,
      blob: blob,
      userId: userId,
    };

    let affectedRows = yield this.Session.update(data, {where: {id: sid}});
    if (affectedRows == 0) { // no affected rows => assume the record not exists
      yield this.Session.build(data).save();
    }
  } catch (err) {
    console.error(err.stack);
  }
};

/**
 * Remove data
 */
SequelizeStore.prototype.destroy = SequelizeStore.prototype.remove = function *(sid) {
  try {
    yield this.Session.destroy({where: {id: sid}});
  } catch (err) {
    console.error(err.stack);
  }
};

/**
 * Create a Sequelize store
 */
exports.create = function (model) {
  return new SequelizeStore(model);
};
