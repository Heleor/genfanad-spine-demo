var express = require('express');
var http = require('http');
var path = require('path');

const PORT = 7800;

var app = express();
app.set('port', PORT);

app.use('/',express.static(path.join(__dirname,'site')));
app.use('/spine',express.static(path.join(__dirname,'spine')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/site/spine-demo.html'));
});

var server = http.Server(app);
server.listen(PORT, function() {
    console.log('Starting server on port ' + PORT);
});