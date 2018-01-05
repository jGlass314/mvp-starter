import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Playlist from './components/Playlist.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      term: ''
    }
  }

  search(term) {
    console.log('searching for:', term);
      $.ajax({
        method: 'POST',
        url: '/playlists',
        data: {searchTerm: term}, 
        success: (data) => {
          data = JSON.parse(data);
          // console.log('search result:', data.playlists.items);
          this.setState({
            items: data.playlists.items,
            term: term + ' '
          })
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

  onPopularSearch() {
    $.ajax({
      url: '/playlists', 
      success: (data) => {
        this.setState({
          items: data,
          term: ''
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    var playlistTerm;
    if(this.state.term && this.state.term.length) {
      let playlistTermArray = this.state.term.split(' ');
      playlistTermArray = playlistTermArray.filter(val => val);
      playlistTermArray.forEach((word, index) => {
        playlistTermArray[index] = String(word[0]).toUpperCase() + word.slice(1);
      })
      playlistTerm = playlistTermArray.join(' ');
    } else {
      playlistTerm = 'Popular';
    }
    return (
    
    <div style={{'background-color':'#d3ede4'}}>
      <h1>Spotify Playlist Search</h1>
      <table>
        <tr>
          <td>
            <Search callback={this.search.bind(this)}/>
          </td>
          <td>
            <button type='button' onClick={() => this.onPopularSearch()}>Popular Search</button>
          </td>
        </tr>
      </table>
      <h3>{playlistTerm} Playlists</h3>
      <Playlist items={this.state.items}/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));