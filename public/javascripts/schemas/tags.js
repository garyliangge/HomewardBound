var mongoose = require('mongoose');

var Tags = mongoose.model('Tags', {
    animalID : Number,
    tags : Array,
    saliences : Array

});

module.exports = Tags;
