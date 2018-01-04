var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true
});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var playlistSchema = mongoose.Schema({
  external_url: String,
  id: {
    type: Number,
    index: true
  },
  image_url: String,
  name: String,
  owner_display_name: String,
  tracks_href: String,
  tracks_count: Number,
  search_count: {
    type: Number,
    index: true
  }
});

var Playlist = mongoose.model('Item', playlistSchema);

var selectAll = function(callback) {
  Playlist.find({})
    .limit(10)
    .sort('-search_count')
    .exec(function(err, playlists) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, playlists);
      }
    });
};

module.exports.selectAll = selectAll;