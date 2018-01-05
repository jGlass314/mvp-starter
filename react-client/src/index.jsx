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
            items: data.playlists.items
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