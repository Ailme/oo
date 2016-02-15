"use strict";

function *index() {
  const fs = require('fs');
  const path = require('path');
  const config = require('../config/path');
  const xlsx = require('xlsx');

  let sheetName, worksheet, range, cell, value, workbook;
  let data = {};

  workbook = xlsx.readFileSync('d:\\Projects\\oo.bte-atm.dev\\storage\\tmp\\0.13379215146414936');

  // список оборудования
  sheetName = workbook.SheetNames[2];
  console.log(sheetName);

  /* Get worksheet */
  worksheet = workbook.Sheets[sheetName];

  //range = worksheet['!range'];
  //console.log(worksheet.raw);

  let rows = xlsx.utils.sheet_to_json(worksheet);
  console.log(rows);

  //for (let R = range.s.r; R <= range.e.r; ++R) {
  //  console.log(worksheet['A' + R]);
  //}

  yield this.render('test/index')
}


module.exports.index = index;
