
'use strict';
 
var https = require ('https');
const functions = require('firebase-functions');
const DialogFlowApp = require('actions-on-google').DialogFlowApp;

console.log('set me');
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Request Headers: ' + JSON.stringify(request.headers));
  console.log('Request Body: ' + JSON.stringify(request.body));
  
 

const parameters = request.body.queryResult.parameters;

let citta =parameters['geo-city1'];
var citta1= citta.charAt(0).toUpperCase() + citta.slice(1);    

getCentro (citta1, response);

});

function getCentro (citta1, CloudFnResponse) {

	
	console.log("città: " + citta1);


	

	var pathString = "/test.php?town=" + citta1;

	console.log ('path string:' + pathString);

	

	var request = https.get({
		host: "https://www.smilelineallineatori.it/",
		path: pathString,
		
	}, function (response) {
		var json = "";
		response.on('data', function(chunk) {
			console.log("received JSON response: " + chunk);
			json += chunk;

			
		});

		response.on('end', function(){
			var jsonData = JSON.parse(json);
			var stockPrice = jsonData[0].name;

			console.log ("nome è " + stockPrice);

			var chat = "il nome è " + stockPrice;

			CloudFnResponse.send(buildChatResponse(chat));

		});

});

}

function buildChatResponse(chat) {
	return JSON.stringify({"fulfillmentText": chat});
}
