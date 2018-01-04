var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/playlists', function (req, res) {
  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
  data = [ 
    {
      externalUrl: 'http://www.google.com',
      id: 5,
      imageUrl: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/',
      name: 'kitten playlist',
      ownerDisplayName: 'Josh',
      tracksHref: 'https://api.spotify.com/v1/users/holgar_the_red/playlists/5Lzif2bIMW8RiRLtbYJHU0/tracks',
      tracksCount: 61
    }
  ];
  res.json(data);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

