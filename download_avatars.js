// Set globals
var fs = require('fs');
var request = require('request');
var GITHUB_USER = "wyleroo";
var GITHUB_TOKEN = "94cec98e0f19c1fa5082ffee9e70e0462eeaab9e";
var USER_AGENT = 'wyleroo';

console.log('Welcome to the GitHub Avatar Downloader!');

// Set main fxn
function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner && repoName){
    var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
    var options = {
      url: requestURL,
      headers: {
        'User-Agent': USER_AGENT
      }
    };
    request(options, function (error, response, body) {
      let obj = JSON.parse(body);
      cb(null, obj);
    });
  }
}

// Callback fxn
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function(err) {
    console.log(err);
  })
  .pipe(fs.createWriteStream(filePath));
}

// Function call
getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  result.forEach(function(element) {
    var filePath = './hotPics/' + element.login + '.jpg';
    downloadImageByURL(element.avatar_url, filePath);
  });
});


