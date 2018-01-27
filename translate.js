// translate.js
const postToBackend = require('./backEnd.js')();

// exports.handler = function(event, context, callback)
module.exports = function(request)
{
		return checkRequestBody(request)
		.then(postToBackend())
		.then( response => 
		{
			return makeGoogleResponse(response);
		}).catch( error => 
		{
			logError(logger, error);
			return { speech: errorResponse, displayText: text };
		});
};


function checkRequestBody(request)
{
	var body = request;
	var errorStart = "Invalid Request: ";
	var errType;
	console.log("Request: ", body);
	if(!body.sessionId || !body.result)
	{
		errType = errorStart + "No sessionId or result in body";
	} 
	else if(!body.id)
	{
		errType = errorStart + "NO userId in request";
	} 
	else if(!body.result)
	{
		errType = errorStart + "No result in request";
	}

	if(errType)
	{
		return Promise.reject(
		{
			errorType: errType,
			errorData: body
		});
	}

	return Promise.resolve(
	{
		sessionId: body.sessionID,
		userId: body.id,
		query: body.result.parameters,
		clientType: "Google"
	});
}

function makeGoogleResponse(response)
{
	var output = 
	{
		speech: response.text,
		displayText: response.text
	}
	return Promise.resolve(output);
}