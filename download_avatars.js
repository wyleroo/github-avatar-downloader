// Set globals
var fs = require('fs');
var request = require('request');

var GITHUB_USER = "wyleroo";
var GITHUB_TOKEN = "94cec98e0f19c1fa5082ffee9e70e0462eeaab9e";
var USER_AGENT = 'wyleroo';

//
console.log('Welcome to the GitHub Avatar Downloader!');

  // Authentication
  var options = {
    url: 'https://api.github.com/repos/jquery/jquery/contributors',
    headers: {
     'User-Agent': USER_AGENT,
    }
  };


// Main fxn start
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  request(options, function (error, response, body) {
    let obj = JSON.parse(body);
    cb(null, obj);
  });
}

function downloadImageByURL(url, filePath) {
request.get(url)
  .on('error', function(err) {
    console.log(err);
  })
  .pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(element) {
    var filePath = './hotPics/' + element.login + '.jpg';
    downloadImageByURL(element, filePath);
  });
});

