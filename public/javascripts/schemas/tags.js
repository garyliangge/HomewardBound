var mongoose = require('mongoose');

var Tags = mongoose.model('Tags', {
    animalID : Number,
    tag : Array,
    salience : Array

});

module.exports = Tags;
