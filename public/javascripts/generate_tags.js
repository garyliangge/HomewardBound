var database = require('../public/javascripts/database.js');

var newJSONS = [];





// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Your Google Cloud Platform project ID
const projectId = 'homewardbound-159107';

// Instantiates a client
const languageClient = Language({
  projectId: projectId,
  keyFilename: './googleML/HomewardBound-5e1e01370d3e.json'
});




database.getDesc(function(arr){
  for(var j = 0; j < arr.length; j++) {

    var obj = new Object();
    obj.animalID = arr[j].animalID;
    obj.animalDescriptionPlain = arr[j].animalDescriptionPlain;
    obj.tags = [];
    obj.saliences = [];
    if(arr[j].animalDescriptionPlain.length > 0) {
      languageClient.detectEntities(arr[j].animalDescriptionPlain).then(function(results) {
        // console.log(" ");
        entities = results[1].entities;

        if(entities.length > 0) {
          for(var i = 0; i < entities.length; i++) {
            obj.tags.push(entities[i].name.toLowerCase());
            obj.saliences.push(entities[i].salience);

            // console.log(entities[i].name.toLowerCase(), entities[i].salience);
          }
        } else {
          obj.tags.push('<EMPTYSTRING>');
          obj.saliences.push(0.0);

          // console.log('<EMPTYSTRING>', 0);

        }
      }).then(function(){
        // console.log(j)
        newJSONS.push(obj);
        console.log(obj.animalID);
        console.log(newJSONS.length); 
      });
    } else {
      obj.tags.push('<EMPTYSTRING>');
      obj.saliences.push(0.0);

      // console.log('<EMPTYSTRING>', 0);
      // console.log(j)
      newJSONS.push(obj);
      console.log(obj.animalID);
      console.log(newJSONS.length);

    }
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admiral' });
  console.log(newJSONS.length);
});