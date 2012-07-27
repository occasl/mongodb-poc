var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express.createServer();

mongoose.connect('mongodb://localhost/dogtag');
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

// set up the RESTful API, handler methods are defined in api.js
var api = require('./controller/api.js');
app.post('/dogtag', api.post);
app.get('/dogtag/:name/:descr/:latitude/:longitude?', api.save);
app.get('/dogtag/:name.:format?', api.show);
app.get('/dogtag', api.list);

app.listen(8080);
console.log("DogTag server listening on port %d", app.address().port);
