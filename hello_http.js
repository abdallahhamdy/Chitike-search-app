var sys = require("util"),
    http = require("http"),
    async = require('./async/lib/async'), // par request *failed to add library into repos on github*
    events = require("events");

var rl = require('readline');
var timeoutReached = false;  // Service level agreemet initilization 

var client = http.createClient(80, "github.com"),
    body = "";
var clientT = http.createClient(80,  "search.twitter.com"),
    bodyT = "";
var clientF = http.createClient(80, "api.flickr.com"),
    bodyF= "";

var i = rl.createInterface(process.stdin, process.stdout, null);
i.question("Input search term to use for Twitter, Flickr and GitHub: ", function(answer) {
async.parallel([
function getResults(callback) {
//clearInterval(interval);
  var request = client.request("GET", "/api/v2/json/repos/search/"+answer);
  request.on('response', function (response) {
  var body = '';
  response.on('data', function (chunk) {
    body += chunk;
  });
  response.on('end', function () {
  console.log(JSON.parse(body));
console.log ('****************************************************');
console.log('                 GIITHUB                             ');
console.log ('****************************************************');
  });

});
request.end(); // start the request;

},

function getResultsT(callback) {
//clearInterval(intervalT);
  var requestT = clientT.request("GET", "/search.json?q="+answer); 
 requestT.on('response', function (response) {
  var bodyT = '';
  response.on('data', function (chunk) {
    bodyT += chunk;
  });
  response.on('end', function () {
	console.log(JSON.parse(bodyT));
console.log ('****************************************************');
console.log('                   TWITTER                           ');
console.log ('****************************************************');
  });

});
requestT.end(); 

} ,


function getResultsF(callback) {
//clearInterval(intervalF);
  var requestF = clientF.request("GET", "/services/rest/?method=flickr.photos.search&api_key=b3173fd953498c251b4303252342eec7&per_page=3&format=json&tags="+answer); 
 requestF.on('response', function (response) {
  var bodyF = '';
  response.on('data', function (chunk) {
    bodyF += chunk;
  });
  response.on('end', function () {
	console.log(bodyF);
console.log ('****************************************************');
console.log('                 FLICKR                              ');
console.log ('****************************************************');
  });

});
requestF.end(); 

},
function(callback) {
            setTimeout(function() {
              if(!timeoutReached) {
                sys.puts("Timeout reached");
              }
            }, 100);
          }
]);
//var interval = setInterval(getResults, 100);
//var intervalT = setInterval(getResultsT, 100);
//var intervalF = setInterval(getResultsF, 100);

i.close();

  process.stdin.destroy();
});