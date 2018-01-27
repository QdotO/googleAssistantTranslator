//backEnd.js
var aws = require('aws-sdk');
var lambda = new aws.Lambda({
  region: 'us-west-2' //change to your region
});

module.exports = function(request)
{
	lambda.invoke
	(
		{
	  		FunctionName: 'CraigslistQuery',
	  		Payload: JSON.stringify(request, null, 2) 
		}, 
		function(error, data) 
		{
			if(error) 
			{
				console.log("Something broke: ", error);
				context.done('error', error);
			}
			if(data.Payload)
			{
				console.log("Back from backend: ", data.Payload);
				context.succeed(data.Payload)
			}
		}
	);
}