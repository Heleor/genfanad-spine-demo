var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs-extra');

const PORT = 7800;

var app = express();
app.set('port', PORT);

app.use('/',express.static(path.join(__dirname,'site')));
app.use('/spine',express.static(path.join(__dirname,'spine')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/site/spine-demo.html'));
});

getSkinOptions = () => {
    // assume the skins directory is in static
    const root = './spine/default/';
    let items = {};
    let meshes = fs.readdirSync(root);
    for (let i in meshes) {
        items[meshes[i]] = fs.readdirSync(root + meshes[i]);
    }
    return items;
}

app.get('/skins', (req, res) => {
    res.send(JSON.stringify(getSkinOptions()));
});

var server = http.Server(app);
server.listen(PORT, function() {
    console.log('Starting server on port ' + PORT);
});