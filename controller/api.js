var DogTag = require('../model/dogtag.js');

exports.post = function(req, res) {
    var dogtag = new DogTag({name: req.body.name, description: req.body.descr,
        longitude: req.body.longitude, latitude: req.body.latitude});
    dogtag.save(function (err) {
        if (err) throw err;
        console.log('Task saved.');
        
        res.send('Dogtag saved.');
    });
}

exports.save = function(req, res) {
    var dogtag = new DogTag({name: req.params.name, description: req.params.descr,
        longitude: req.params.longitude, latitude: req.params.latitude});
    dogtag.save(function (err) {
        if (err) throw err;
        console.log('Dogtag saved.');
	
        res.send('Dogtag saved.');
    });
}

exports.list = function(req, res) {
    DogTag.find(function(err, dogtag) {
	res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
        res.send(req.query["callback"] + '({"records":' +  JSON.stringify(dogtag) + '});');
    });
}

// first locates a dog by its name
exports.show = (function(req, res) {
    DogTag.findOne({name: req.params.name}, function(error, dogtag) {
        res.send([{Dog: dogtag}]);
    })
});


exports.near = function(req, res) {
    DogTag.find({coords : { $near : [req.params.lon, req.params.lat], $maxDistance : req.params.dist/68.91}}, function (error, dogtag) {        
        res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
        res.send(req.query["callback"] +'({"records":' + JSON.stringify(dogtag) + '});');
    })
}

