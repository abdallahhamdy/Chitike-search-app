var sys = require("util"),
    http = require("http"),
    events = require("events");
var apikey='b3173fd953498c251b4303252342eec7';

sys.puts("Hi there…FLICKRTST ");

var clientF = http.createClient(80, "api.flickr.com"),
    bodyF= "",
    queryF="egypt";

function getResultsF() {
clearInterval(intervalF);
  var requestF = clientF.request("GET", "/services/rest/?method=flickr.photos.search&api_key=b3173fd953498c251b4303252342eec7&per_page=1&format=json&tags=flower"); 
 requestF.on('response', function (response) {
  var bodyF = '';
  response.on('data', function (chunk) {
    bodyF += chunk;
  });
  response.on('end', function () {
    //console.log('BODY: ' + body);
	console.log(bodyF);
console.log ('****************************************************');
console.log('                  Flicker                            ');
console.log ('****************************************************');
  });

});
requestF.end(); // start the request;


} 


var intervalF = setInterval(getResultsF, 3000);



