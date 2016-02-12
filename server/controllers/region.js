"use strict";

function *importIndex() {
  yield this.render('region/import')
}

function *importExcel() {
  const parse = require('co-busboy');
  const fs = require('fs');
  const path = require('path');
  const config = require('../config/path');
  const xlsx = require('xlsx');

  let sheetName, worksheet, range, cell, value, part, workbook;
  let data = {};

  // multipart upload
  let parts = parse(this, {
    checkFile: function (fieldname, file, filename) {
      let ext = path.extname(filename);

      if (ext !== '.xls' && ext !== '.xlsx' && ext !== '.csv') {
        var err = new Error('invalid file')
        err.status = 400
        return err
      }
    }
  });

  while (part = yield parts) {
    if (part.length) {
      console.log('key: ' + part[0]);
      console.log('value: ' + part[1]);
    } else {
      let stream = fs.createWriteStream(path.join(config.tmp, Math.random().toString()));
      part.pipe(stream);

      console.log('uploading %s -> %s', part.filename, stream.path);

      //data = {
      //  fileName: part.filename,
      //  tmpPath: stream.path,
      //  tmpFileName: path.basename(stream.path),
      //};


      workbook = xlsx.readFileSync('d:\\Projects\\oo.bte-atm.dev\\storage\\tmp\\0.08044596249237657');

      // список оборудования
      sheetName = workbook.SheetNames[4];
      /* Get worksheet */
      worksheet = workbook.Sheets[sheetName];

      range = worksheet['!range'];

      for (let R = range.s.r; R <= range.e.r; ++R) {
        console.log(worksheet['A' + R]);
        //for (let C = range.s.c; C <= range.e.c; ++C) {
        //  let cellAddress = {c: C, r: R};
        //
        //}
      }
    }
  }

  yield this.render('region/import', data)
}

module.exports.import = importIndex;
module.exports.doImport = importExcel;
