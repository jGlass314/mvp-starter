var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var api = require('../spotify-api/api.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/playlists', function (req, res) {
  console.log('got post request with term:', req.body.searchTerm);  
  // make API request here
  api.makePlaylistSearch(req.body.searchTerm, 25)
    .then(results => {
      console.log(JSON.parse(results).playlists.items);
      // upsert into mongodb
      items.savePlaylists(JSON.parse(results).playlists.items)

      res.json(results);
    })
    .catch(err => {
      console.error('Error on api playlist search:', err);
      res.status(500).json(err);
    })
});

app.get('/playlists', function (req, res) {
  console.log('got get request');
  items.selectAllPlaylists(25)
    .then(documents => {
      let data = documents.map(doc => {
        // console.log('about to construct with doc:', doc);
        let obj = {};
        let images = [{url: doc.image_url}];
        obj.external_urls = {spotify: doc.external_urls};
        obj.id = doc.id;
        obj.images = images;
        obj.name = doc.name;
        obj.owner = {display_name: doc.owner_display_name};
        obj.tracks = {total: doc.tracks_count};
        obj.search_count = doc.search_count;
        console.log('constructed obj:', obj);
        return obj;
      })
      // console.log('responding to get with:', data);
      res.json(data);
    })
    .catch(err => {
      console.error('Error on get of playlists:', err);
      res.status(500).json('Error on get of playlists');
    });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

