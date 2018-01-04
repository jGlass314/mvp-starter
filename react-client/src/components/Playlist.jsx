import React from 'react';
import PlaylistItem from './PLaylistItem.jsx';

const Playlist = (props) => (
  <div>
    <h4> Playlist Component </h4>
    There are { props.items.length } items.
    <table>
      <tbody>
        <tr>
          { props.items.map(item => <PlaylistItem item={item}/>)}
        </tr>
      </tbody>
    </table>
  </div>
)

export default Playlist;