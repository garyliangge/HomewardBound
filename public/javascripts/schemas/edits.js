var mongoose = require('mongoose');

var Edits = mongoose.model('Edits', {
    animalID : Number,
    edit : String
})

module.exports = Edits;
