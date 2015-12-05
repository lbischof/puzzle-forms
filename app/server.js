var express    = require('express');
var path       = require('path');
var session    = require('express-session');
var bodyParser = require('body-parser');
var path       = require('path');
var fs         = require('fs');
var uglify     = require("uglify-js");

var router     = require('./router');
var app        = express();

app.use(session({secret: "secret"}));
app.use(bodyParser.json());
app.use(router);
app.set('views', __dirname);
app.set('view engine', 'jade');

// minify client-side files
var files = [
        'node_modules/markup-js/src/markup.min.js',
        'node_modules/json-editor/dist/jsoneditor.min.js',
        'node_modules/grapnel/dist/grapnel.min.js',
        'node_modules/fetchival/index.min.js',
        'app/static/garlic.min.js',
        'app/static/main.js'
        ]

var uglified = uglify.minify(files);

fs.writeFile('app/static/concat.min.js', uglified.code, function (err){
    if(err) {
        console.log(err);
    } else {
        console.log("Script generated and saved:", 'app/static/concat.min.js');
    }
});

var server_port = process.env.SERVER_PORT || 8080
var server_ip_address = process.env.SERVER_IP || '127.0.0.1'

var server = app.listen(server_port, server_ip_address,  function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Puzzle Forms listening at http://%s:%s', host, port);
});
