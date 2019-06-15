var fs = require('fs');
var XLSX = require('xlsx');
var express = require('express');
var ejs = require('ejs');

var wb = XLSX.readFile('Suttas.xlsx');
delete wb.Sheets['Index'];
wb.SheetNames = wb.SheetNames.filter(function(item) { 
    return item !== 'Index'
});

var app = express();
app.set('view engine', 'ejs');

for (var i = 0; i < wb.SheetNames.length; i++) {
  writeHtml(wb.SheetNames[i]);
};

function writeHtml(name) {
  var data = XLSX.utils.sheet_to_json(wb.Sheets[name]);
  var suttaName = name.match(/(.*?)(\s|$)/)[1].toLowerCase();
  var htmlFilename = 'dist/' + suttaName + '.html';
  var jsonFilename = 'dist/' + suttaName + '.json';

  console.log('writing' + name.match(/(.*?)(\s|$)/)[1]);

  var dir = './tmp';

  // create dist folder if not exist
  if (!fs.existsSync('dist')){
    fs.mkdirSync('dist');
  }

  fs.writeFile(jsonFilename, JSON.stringify(data, null, 2), function(err) {
    if (err) throw err;
    console.log('saved ' + jsonFilename);
  });

  app.render('layouts/sutta', {
    content: data
  }, function(err,html){
    if (err) throw err;
    fs.writeFile(htmlFilename, html, function(err) {
      if (err) throw err;
      console.log('saved ' + htmlFilename);
    });
  });
}