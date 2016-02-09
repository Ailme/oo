"use strict";

const xlsx = require('xlsx');
const workbook = xlsx.readFile(__dirname + '/test.xls');

let sheetName, worksheet, range, cell, value;


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

/* Find desired cell */
//let desired_cell = worksheet['A1'];
/* Get the value */
//let desired_value = desired_cell.v;

//console.log(worksheet);
