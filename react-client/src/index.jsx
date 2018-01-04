import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Playlist from './components/Playlist.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
      //   {
      //     externalUrl: 'http://www.google.com',
      //     id: 5,
      //     imageUrl: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/',
      //     name: 'kitten playlist',
      //     ownerDisplayName: 'Josh',
      //     tracksHref: 'https://api.spotify.com/v1/users/holgar_the_red/playlists/5Lzif2bIMW8RiRLtbYJHU0/tracks',
      //     tracksCount: 61
      //   }
      // ]
    }
  }

  search(term) {
    console.log('searching for:', term);
      $.ajax({
        url: '/playlists', 
        success: (data) => {
          this.setState({
            items: data
          })
          console.log(this.state.items);
        },
        error: (err) => {
          console.log('err', err);
        }
      });
  }

  componentDidMount() {
    $.ajax({
      url: '/playlists', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h4>Search</h4>
      <Search callback={this.search.bind(this)}/>
      <h1>Playlists</h1>
      <Playlist items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));