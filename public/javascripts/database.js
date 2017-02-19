var mongodb = require('mongodb');
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
mongoose.connect('mongodb://NGNL:ngnlftw1!@ds145359.mlab.com:45359/homebound');
var ObjectId = require('mongodb').ObjectID;
// var url = 'mongodb://localhost:27017/test';

/* Mongo Shit */
// var dat = JSON.parse("catGeneral100.txt")
var fs = require("fs");
var dataString = fs.readFileSync("animalsGeneral100.txt");
var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//     getDesc(db, function(ret) {
//         console.log(ret);
//      db.close();
//     });
//
// });
var database = {
    insertDocument : function(callback) {
        var dat = JSON.parse(dataString);


        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
          // we're connected!
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
              var arr = cursor.toArray(
                  function(err, doc){
                      callback(doc);
                  });
        });
    }

};
// var getDesc = function(db, callback) {
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function() {
//         console.log("ready")
//         var cursor = db.collection('animals').find({},{'animalID':1, 'animalDescription': 1}, function(err, array) {
//             callback(array);
//         });
//
//     })
//     // return ret;
//     // callback(arr);
// }

// "animalID":"181","animalOrgID":"12","animalName":"Sophie","animalBreed":"Domestic Short Hair \/ Domestic Short Hair \/ Mixed (short coat)"
// var database = {
//   insertDocument : function(db, callback) {

//   }
//
// }

module.exports = database;
