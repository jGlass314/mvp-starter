var request = require('request-promise');
var config = require('../config.js');

var access_token = undefined;

var getAuthToken = () => {
  let secret = new Buffer(config.ClientID + ':' + config.ClientSecret).toString('base64');
  console.log('base64 secret:', secret);
  let options = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token?grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  request(options)
  .then(response => {
    response = JSON.parse(response);
    access_token = response.access_token;
    let token_timeout = response.expires_in;
    console.log('access_token:', access_token);
    // set timer to get new token
    setTimeout(() => {
      getAuthToken();
    }, token_timeout*1000);
    console.log('timer set');
  })
  .catch(err => {
    console.error('error in getting auth token:', err);
  })
}

var makePlaylistSearch = (term, itemCount) => {
  let options = {
    url: `https://api.spotify.com/v1/search?q=${term}&type=playlist&limit=${itemCount}`,
    auth: {
      bearer: access_token
      }
  }
  return request(options);
}

// get token on initialization
getAuthToken();

module.exports.makePlaylistSearch = makePlaylistSearch;
module.exports.getAuthToken = getAuthToken;
