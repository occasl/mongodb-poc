// The Thread model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var dtSchema = new Schema({
    name:String,
    description:String,
    date: {type: Date, default: Date.now},
    longitude: Number,
    latitude: Number
});

module.exports = mongoose.model('DogTag', dtSchema);