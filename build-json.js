var fs = require('fs');
var XLSX = require('xlsx');
var express = require('express');
var exphbs  = require('express-handlebars');

var wb = XLSX.readFile('Suttas.xlsx');
delete wb.Sheets['Index'];
wb.SheetNames = wb.SheetNames.filter(function(item) { 
    return item !== 'Index'
});

for (var i = 0; i < wb.SheetNames.length; i++) {
  writeJson(wb.SheetNames[i]);
};

function writeJson(name) {
  var data = XLSX.utils.sheet_to_json(wb.Sheets[name])
  var dataJson = JSON.stringify(data, null, 2);
  var filename = 'json/' + name.match(/(.*?)(\s|$)/)[1] + '.json';
  fs.writeFile(filename, dataJson, function(err) {
    if (err) throw err;
    console.log('saved ' + filename);
  });
}