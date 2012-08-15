#!/bin/env node

var express = require('express');
var mongoose = require('mongoose');
var app = express();

//  Get the environment variables we need.
var ipaddr  = process.env.VCAP_APP_HOST;
var port    = process.env.PORT;

if (process.env.VCAP_SERVICES){
    srv = JSON.parse(process.env.VCAP_SERVICES);
    cred = srv['mongodb-1.8'][0].credentials;
    db = new mongo.Db(cred.db, new mongo.Server(cred.hostname, cred.port, {}), {});
    console.log(cred);

    config.mongo_host = cred.hostname;
    config.mongo_port = cred.port;
    config.mongb_db = cred.db;
    
    config.port = config.udp_port = process.env.VCAP_APP_PORT;
    config.udp_address = process.env.VCAP_APP_HOST;

    // Establish connection to MongoDB
    mongoose.connect('mongodb://'+cred.hostname+':'+cred.port+'/'+cred.db);
}

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
