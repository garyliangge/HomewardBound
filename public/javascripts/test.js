var database = require('./database.js');
var tag = require('./generate_tags.js');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}
sleep(10000).then(function(){
	console.log('wow')
	console.log(tag.newJSONS[4])
})