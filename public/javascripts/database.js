var mongodb = require('mongodb');
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
mongoose.connect('mongodb://NGNL:ngnlftw1!@ds145359.mlab.com:45359/homebound');

/* Mongo Shit */
var fs = require("fs");

var db = mongoose.connection;

var database = {
    insertDocument : function(file, callback) {

        var dataString = fs.readFileSync(file);

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
          // we're connected!
              var dat = JSON.parse(dataString);
              var bulk = db.collection('animals').initializeUnorderedBulkOp();
              var counter = 0;
              for (var key in dat.data) {
                  bulk.insert(dat.data[key]);
                  counter++;
                  console.log(counter);
              }
              bulk.execute(function(err, result) {
                    // do something with result
                  callback();
              });
        });
    },

    getDesc : function(callback) {
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
          // we're connected!
              var cursor = db.collection('animals').find({},{'animalID':1, 'animalDescription': 1});

              cursor.toArray(
              function(err, doc){
                  callback(doc);
              });
        });
    },

    getAnimals : function(callback) {
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            var cursor = db.collection('animals').find({});
            cursor.toArray(
            function(err, doc){
                callback(doc);
            });
        });
    }



};

// "animalID":"181","animalOrgID":"12","animalName":"Sophie","animalBreed":"Domestic Short Hair \/ Domestic Short Hair \/ Mixed (short coat)"
// var database = {
//   insertDocument : function(db, callback) {

//   }
//
// }

module.exports = database;
