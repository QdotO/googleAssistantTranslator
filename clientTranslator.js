//clientTranslator.js
// const callRouter = require('/apiRequestor.js');
const translate = require('./translate.js');
exports.handler = function (event, context, callback){
	var data = "default";
	translate(event)
	.then(output => {
		if( typeof output != 'undefined'){
			data = output;
		}
		console.log("Data returning from Translator: ", data);
		callback(null, data);
	});

};