var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true
});
mongoose.Promise = require('bluebird');
mongoose.Promise = require('q').Promise;

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
    type: String,
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

var Playlist = mongoose.model('Playlists', playlistSchema);

var savePlaylists = (items) => {
  return Promise.all(items.map(item => {
    Playlist.findOne({id: item.id})
      .then(document => {
        if(!document) {
          // console.log('insert playlist:', item);
          let playlist = new Playlist({
            external_urls: item.external_urls.spotify,
            id: item.id,
            image_url: item.images[0].url,
            name: item.name,
            owner_display_name: item.owner.display_name,
            tracks_count: item.tracks.total,
            search_count: 1
          });
          return playlist.save();
        } else {
          // console.log('typeof document.search_count:', typeof document.search_count);
          // console.log('update item.id:', document.id, 'search_count:', document.search_count+1);
          return Playlist.update({id: document.id}, {search_count: document.search_count+1});
        }
      })
      .catch(err => {
        console.error('Error on findOne of Playlist:', err);
      })
  }))
}

var selectAllPlaylists = function(itemCount) {
   return Playlist.find({})
  //  .then((docs) => {
  //    console.log('docs:', docs);
  //  })
  //  .catch((err) => {
  //    console.error('error: ', err);
  //  })
      .limit(itemCount)
      .sort('-search_count');
  // Playlist.find(function (err, docs) {
  //   if (err) return console.error(err);
  //   console.log('docs:', docs);
  // })
};

module.exports.selectAllPlaylists = selectAllPlaylists;
module.exports.savePlaylists = savePlaylists;