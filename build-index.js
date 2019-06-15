var fs = require('fs');
var XLSX = require('xlsx');
var express = require('express');
var ejs = require('ejs');

var wb = XLSX.readFile('Suttas.xlsx');

/* convert array to nested object */ 

/* -------------------------------------------------
 * Utilities function
 * -------------------------------------------------- */

function setByString(path, obj, value) {
    var schema = obj;  // a moving reference to internal objects within obj
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if( !schema[elem] ) schema[elem] = {}
        schema = schema[elem];
    }
    schema[pList[len-1]] = value;
}

function reorganizeIndex(indexArr) {
	var indexObj = {}
	for (var i = 0; i < indexArr.length; i++) {
		if (indexArr[i].key) {
			setByString(indexArr[i].key, indexObj, indexArr[i]);	
		}
	};
	return indexObj;
}

/* -------------------------------------------------
 * Render
 * -------------------------------------------------- */

var app = express();
app.set('view engine', 'ejs');

function writeIndexJson() {
  var indexArr = XLSX.utils.sheet_to_json(wb.Sheets['Index']);
  var indexObj = reorganizeIndex(indexArr);
  var indexJson = JSON.stringify(indexObj, null, 2);
  var filename = 'dist/index.json';
  fs.writeFile(filename, indexJson, function(err) {
    if (err) throw err;
    console.log('saved ' + filename);
  });
}

function writeIndexHtml() {
  var indexArr = XLSX.utils.sheet_to_json(wb.Sheets['Index']);
	var indexObj = reorganizeIndex(indexArr);
  var filename = 'dist/index.html';
  app.render('layouts/index', {
    content: indexObj
  }, function(err,html){
    if (err) throw err;
    fs.writeFile(filename, html, function(err) {
      if (err) throw err;
      console.log('saved ' + filename);
    });
  });
}

writeIndexJson();
writeIndexHtml();