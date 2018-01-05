var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var api = require('../spotify-api/api.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var data = [ 
  {
    externalUrl: 'http://www.google.com',
    id: 5,
    imageUrl: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/',
    name: 'kitten playlist',
    ownerDisplayName: 'Josh',
    tracksHref: 'https://api.spotify.com/v1/users/holgar_the_red/playlists/5Lzif2bIMW8RiRLtbYJHU0/tracks',
    tracksCount: 61,
    searchCount: 5
  }
];

app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/playlists', function (req, res) {
  console.log('got post request with term:', req.body.searchTerm);  
  // make API request here
  api.makePlaylistSearch(req.body.searchTerm)
    .then(results => {
      // console.log(results);
      res.json(results);
    })
    .catch(err => {
      console.error('Error on api playlist search:', err);
      res.status(500).json(err);
    })
});

app.get('/playlists', function (req, res) {
  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
  console.log('got get request');
  data = [ 
    {
      externalUrl: 'http://www.google.com',
      id: 5,
      imageUrl: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/',
      name: 'kitten playlist',
      ownerDisplayName: 'Josh',
      tracksHref: 'https://api.spotify.com/v1/users/holgar_the_red/playlists/5Lzif2bIMW8RiRLtbYJHU0/tracks',
      tracksCount: 61,
      searchCount: 5
    }
  ];
  res.json(data);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

