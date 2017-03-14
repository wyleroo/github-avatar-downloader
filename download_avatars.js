// Set globals
const request = require('request');
const https = require('https');

const GITHUB_USER = "wyleroo";
const GITHUB_TOKEN = "94cec98e0f19c1fa5082ffee9e70e0462eeaab9e";
const USER_AGENT = 'wyleroo';

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
  var repoName = 'jquery';
  var repoOwner = 'jquery';
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  request(options, function (error, response, body) {
    let obj = JSON.parse(body);
    var avatarURL = [];
    obj.forEach(function(element) {
      console.log(element.avatar_url)
    });
  });
}


getRepoContributors();
//Test block
// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

  //let data = JSON.parse(body).data;


// getRepoContributors();