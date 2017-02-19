var mongodb = require('mongodb');
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
mongoose.connect('mongodb://NGNL:ngnlftw1!@ds145359.mlab.com:45359/homebound');

/* Mongo Shit */
var fs = require("fs");
var Animals = require('./schemas/animals');

var database = {
    // insertDocument : function(file, callback) {
    //
    //     var dataString = fs.readFileSync(file);
    //
    //     db.on('error', console.error.bind(console, 'connection error:'));
    //     db.once('open', function() {
    //       // we're connected!
    //           var dat = JSON.parse(dataString);
    //           var bulk = db.collection('animals').initializeUnorderedBulkOp();
    //           var counter = 0;
    //           for (var key in dat.data) {
    //               bulk.insert(dat.data[key]);
    //               counter++;
    //               console.log(counter);
    //           }
    //           bulk.execute(function(err, result) {
    //                 // do something with result
    //               callback();
    //           });
    //     });
    // },

    getDesc : function(callback) {
        Animals.find({},{'animalID':1, 'animalDescription': 1}, function(err, array) {
            callback(array);
        });

    },

    getAnimals : function(callback) {
        Animals.find({}, function(err, array) {
            callback(array);
        });
    },

    getAnimalById : function(id, callback) {
        Animals.findOne({animalID: id}, function(err, array) {
            callback(array);
        });
    }

};
module.exports = database;
