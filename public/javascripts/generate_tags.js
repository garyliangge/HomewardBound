// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Your Google Cloud Platform project ID
const projectId = 'homewardbound-159107';

// Instantiates a client
const languageClient = Language({
  projectId: projectId,
  keyFilename: './googleML/HomewardBound-5e1e01370d3e.json'
});


var database = require('./database.js');






var newJSONS = [];
function getTagsAndSalience(arr, j) {
    languageClient.detectEntities(arr[j].animalDescriptionPlain).then(function(results) {
      entities = results[1].entities;
      for(var i = 0; i < entities.length; i++) {
        newJSONS[j].tags.push(entities[i].name.toLowerCase());
        newJSONS[j].saliences.push(entities[i].salience);
      }
      // console.log(newJSONS[j].animalID, newJSONS[j].tags);
      if (j < arr.length - 1) {
        getTagsAndSalience(arr, j+1)
      } else {
        database.insertTags(newJSONS, function(){console.log('done')})
      }
    })
}

database.getDesc(function(arr){
  for(var k = 0; k < arr.length; k++) {
    var obj = new Object();
    obj.animalID = arr[k].animalID;
    obj.animalDescriptionPlain = arr[k].animalDescriptionPlain;
    obj.tags = [];
    obj.saliences = [];
    newJSONS.push(obj);
    console.log(obj.animalID);
  }

  getTagsAndSalience(arr, 0);

});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms));
}
sleep(20000).then(function(){
  console.log('wow')
  console.log(newJSONS[4])
  console.log('entering now sdflaksfsdflskjdfaslfjsdalkfjsalfj')
  database.insertTags(newJSONS, function(){console.log('done')})
})