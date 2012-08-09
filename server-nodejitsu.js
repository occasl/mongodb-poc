#!/bin/env node

var express = require('express');
var mongoose = require('mongoose');
var app = express(); //create server deprecated

//  Get the environment variables we need.
var ipaddr  = 'loutilities.mongodb-poc.jit.su';
var port    =  80;

var nodejitsu_mongo = 'mongodb://nodejitsu:42c57bfc9920d449d57b7910e718d210@alex.mongohq.com:10094/nodejitsudb553049368136';
mongoose.connect(nodejitsu_mongo);

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

// set up the RESTful API, handler methods are defined in api.js
var api = require('./controller/api.js');
app.post('/dogtag', api.post);
app.get('/dogtag/:lon/:lat/:dist?', api.near);
app.get('/dogtag/:name/:descr/:latitude/:longitude?', api.save);
app.get('/dogtag/:name.:format?', api.show);
app.get('/dogtag', api.list);


//  And start the app on that interface (and port).
app.listen(port, ipaddr, function() {
   console.log('%s: Node server started on %s:%d ...', Date(Date.now() ),
               ipaddr, port);
});
