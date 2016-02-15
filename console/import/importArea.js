"use strict";

const db = require('../../server/models');
// https://github.com/C2FO/fast-csv
const csv = require('fast-csv');
const fs = require('fs');
const path = require('../../server/config/path');
const async = require('async');

db.sequelize.authenticate().then((err) => {
  async.series([
      function (callback) {
        db.area.sync({force: true}).then((err, res) => {
          callback(null, true);
        });
      },
      function (callback) {
        fs.createReadStream(path.import + "/area.csv")
          .pipe(csv({delimiter: ';'}))
          .on("data", function (data) {
            console.log(data);
            db.area.build({name: data[0].trim()}).save().catch((err) => {
              console.log(err.errors[0].message + ' ' + err.errors[0].value);
            });
          })
          .on("end", function () {
            callback(null, "done");
          });
      }
    ],
    function (err, results) {
      console.log(arguments);
    });
});
