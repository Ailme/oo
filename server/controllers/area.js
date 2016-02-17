"use strict";

const db = require('../models');
// https://www.npmjs.com/package/log-util
const log = require('log-util');
// https://github.com/natergj/excel4node
const xl = require('excel4node');

function *exportExcel(next) {
  let Model = db.area;

  let items = yield function (done) {
    Model.all().then((rows) => {
      done(null, rows);
    }).catch(done);
  };

  let wb = new xl.WorkBook();
  let ws = wb.WorkSheet('My Worksheet');

  // headers
  ws.Cell(1, 1).String('ID');
  ws.Cell(1, 2).String('Название');

  items.forEach((item, i) => {
    ws.Cell(i + 2, 1).String(item.id.toString());
    ws.Cell(i + 2, 2).String(item.name);
  });

  wb.write('экспорт_области.xlsx', this.res);
}

module.exports.export = exportExcel;
