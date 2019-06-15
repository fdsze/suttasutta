var express = require('express');

var app = express();
app.use(express.static('./dist', {
  extensions: 'html'
}));
app.listen(3456, function(){
  console.log('server running on http://localhost:3456/');
});